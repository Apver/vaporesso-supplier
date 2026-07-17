#!/usr/bin/env node
/**
 * Extract activity DOM/CSS from template HTML and bootstrap Activity folder.
 * Usage: node scripts/migrate-activity-template.mjs <config-json>
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

function cssStringToJsxStyle(css) {
  const props = [];
  for (const decl of css.split(';')) {
    const trimmed = decl.trim();
    if (!trimmed) continue;
    const colonIdx = trimmed.indexOf(':');
    if (colonIdx === -1) continue;
    const key = trimmed
      .slice(0, colonIdx)
      .trim()
      .replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const value = trimmed.slice(colonIdx + 1).trim();
    if (/^-?\d+(\.\d+)?$/.test(value)) {
      props.push(`${key}: ${value}`);
    } else {
      props.push(`${key}: '${value.replace(/'/g, "\\'")}'`);
    }
  }
  return `{{${props.join(', ')}}}`;
}

function htmlToJsx(html) {
  return (
    html
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/\bclass=/g, 'className=')
      .replace(/\bfor=/g, 'htmlFor=')
      .replace(/\bautoplay\b/gi, 'autoPlay')
      .replace(/\bplaysinline\b/gi, 'playsInline')
      .replace(/\bwebkit-playsinline\b/gi, '')
      .replace(/\bx-webkit-airplay="[^"]*"/gi, '')
      .replace(/\bcontrolslist=/gi, 'controlsList=')
      .replace(/\bsrcset=/gi, 'srcSet=')
      .replace(/\btabindex=/gi, 'tabIndex=')
      .replace(/\breadonly\b/gi, 'readOnly')
      .replace(/\bmaxlength=/gi, 'maxLength=')
      .replace(/\bcellspacing=/gi, 'cellSpacing=')
      .replace(/\bcellpadding=/gi, 'cellPadding=')
      .replace(/\bcolspan=/gi, 'colSpan=')
      .replace(/\browspan=/gi, 'rowSpan=')
      .replace(/\bframeborder=/gi, 'frameBorder=')
      .replace(/\ballowfullscreen\b/gi, 'allowFullScreen')
      .replace(/\bcrossorigin=/gi, 'crossOrigin=')
      .replace(/ style=""/g, '')
      .replace(/ className=""/g, '')
      .replace(/\bstyle="([^"]*)"/g, (match, css) => {
        if (!css.trim()) return '';
        return `style=${cssStringToJsxStyle(css)}`;
      })
      .replace(/\bstyle='([^']*)'/g, (match, css) => {
        if (!css.trim()) return '';
        return `style=${cssStringToJsxStyle(css)}`;
      })
      .replace(/<br(\s[^>]*?)?>/gi, (match, attrs) => {
        if (match.endsWith('/>')) return match;
        return `<br${attrs || ''} />`;
      })
      .replace(/<img([^>]*?)(?<!\/)>/gi, '<img$1 />')
      .replace(/<source([^>]*?)(?<!\/)>/gi, '<source$1 />')
      .replace(/<input([^>]*?)(?<!\/)>/gi, '<input$1 />')
      .replace(/<meta([^>]*?)(?<!\/)>/gi, '<meta$1 />')
      .replace(/<link([^>]*?)(?<!\/)>/gi, '<link$1 />')
      // Only map activity-init hooks; keep other custom elements as JSX tags
      .replace(/<([a-z][a-z0-9-]*)([^>]*)>/gi, (match, tag, attrs) => {
        if (!tag.includes('-')) return match;
        const dataXwcTags = new Set(['kv-banner', 'offline-handler']);
        if (!dataXwcTags.has(tag)) return match;
        const dataAttr = ` data-xwc="${tag}"`;
        if (attrs.includes('data-xwc=')) return match;
        return `<div${dataAttr}${attrs}>`;
      })
      .replace(/<\/([a-z][a-z0-9-]*)>/gi, (match, tag) => {
        if (!tag.includes('-')) return match;
        const dataXwcTags = new Set(['kv-banner', 'offline-handler']);
        if (!dataXwcTags.has(tag)) return match;
        return '</div>';
      })
  );
}

function extractStyleContent(text) {
  return text
    .replace(/^\s*<style[^>]*>/i, '')
    .replace(/<\/style>\s*$/i, '')
    .trim();
}

function readLines(filePath, start, end) {
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  return lines.slice(start - 1, end).join('\n');
}

function pascalCase(str) {
  return str
    .split(/[-_]/)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join('');
}

function processCss(cssRaw, htmlClass, rootClass) {
  let css = extractStyleContent(cssRaw);

  // Fix invalid nested :root inside blocks – move vars to html class
  const rootVarMatch = css.match(/:root\s*\{([^}]+)\}/);
  if (rootVarMatch) {
    css = css.replace(/:root\s*\{[^}]+\}/, '');
  }

  const header = `html.${htmlClass} {
  scroll-behavior: auto !important;
${rootVarMatch ? rootVarMatch[1].trim().split('\n').map((l) => `  ${l.trim()}`).join('\n') : ''}
}

.${rootClass} {
  width: 100%;
  overflow-x: clip;
}

`;

  // Indent remaining CSS under root class
  const indented = css
    .split('\n')
    .map((line) => (line.trim() ? `  ${line}` : ''))
    .join('\n');

  return header + indented + '\n';
}

function ensureDir(dir) {
  fs.mkdirSync(dir, {recursive: true});
}

function migrate(config) {
  const {
    name,
    handle,
    htmlClass,
    rootClass,
    innerWrapperClass = '',
    htmlPath,
    cssLines,
    cssFiles,
    domLines,
    jsPath,
    dataPrefix = 'xwc',
  } = config;

  const absHtml = path.join(ROOT, htmlPath);
  const activityDir = path.join(ROOT, 'app/components/Activity', name);
  const sectionsDir = path.join(activityDir, 'sections');
  const scssPath = path.join(ROOT, 'app/styles/activity', `${handle}.scss`);

  ensureDir(sectionsDir);

  // CSS
  let cssRaw = '';
  if (cssFiles?.length) {
    cssRaw = cssFiles.map((f) => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n\n');
  } else if (cssLines) {
    cssRaw = readLines(absHtml, cssLines[0], cssLines[1]);
  }
  fs.writeFileSync(scssPath, processCss(cssRaw, htmlClass, rootClass));

  // DOM → single Content.jsx (sections can be split later)
  const domRaw = readLines(absHtml, domLines[0], domLines[1]).trim();
  const jsx = htmlToJsx(domRaw);
  const contentPath = path.join(sectionsDir, 'ActivityContent.jsx');
  fs.writeFileSync(
    contentPath,
    `export function ActivityContent() {
  return (
    <>
${jsx
  .split('\n')
  .map((l) => `      ${l}`)
  .join('\n')}
    </>
  );
}
`,
  );

  // Layout – always refresh wrapper structure
  const layoutPath = path.join(activityDir, 'Layout.jsx');
  fs.writeFileSync(
    layoutPath,
    `import {useRef} from 'react';
import {ActivityContent} from './sections/ActivityContent';
import {use${name}Lenis, use${name}Page} from './use${name}Page';

export function ${name}Layout() {
  const rootRef = useRef(null);
  use${name}Lenis();
  use${name}Page(rootRef);

  return (
    <div className="${rootClass}" ref={rootRef}>
${innerWrapperClass ? `      <div className="${innerWrapperClass}">` : ''}
        <ActivityContent />
${innerWrapperClass ? '      </div>' : ''}
    </div>
  );
}
`,
  );

  // index.js
  const indexPath = path.join(activityDir, 'index.js');
  if (!fs.existsSync(indexPath)) {
    fs.writeFileSync(indexPath, `export {${name}Layout} from './Layout';\n`);
  }

  // initScrollAppear
  const scrollAppearSrc = path.join(ROOT, 'app/components/Activity/Xros6Worldcup/initScrollAppear.js');
  const scrollAppearDst = path.join(activityDir, 'initScrollAppear.js');
  if (!fs.existsSync(scrollAppearDst)) {
    fs.copyFileSync(scrollAppearSrc, scrollAppearDst);
  }

  // usePage hook skeleton
  const hookPath = path.join(activityDir, `use${name}Page.js`);
  if (!fs.existsSync(hookPath)) {
    fs.writeFileSync(
      hookPath,
      `import {useEffect} from 'react';
import Lenis from 'lenis';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {initScrollAppear} from './initScrollAppear';

gsap.registerPlugin(ScrollTrigger);

export function use${name}Lenis() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('${htmlClass}');

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(root, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value, {immediate: true});
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      pinType: root.style.transform ? 'transform' : 'fixed',
    });

    const onRefresh = () => lenis.resize();
    ScrollTrigger.addEventListener('refresh', onRefresh);
    const onTick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.removeEventListener('refresh', onRefresh);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      ScrollTrigger.scrollerProxy(root, {});
      root.classList.remove('${htmlClass}');
    };
  }, []);
}

export function use${name}Page(rootRef) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const cleanups = [initScrollAppear(root)];

    const refreshScroll = () => ScrollTrigger.refresh();
    const refreshFrame = requestAnimationFrame(refreshScroll);
    const refreshTimer = window.setTimeout(refreshScroll, 300);
    const fontsReady = document.fonts?.ready.then(refreshScroll);

    return () => {
      cancelAnimationFrame(refreshFrame);
      window.clearTimeout(refreshTimer);
      fontsReady?.catch(() => undefined);
      cleanups.forEach((fn) => fn?.());
    };
  }, [rootRef]);
}
`,
    );
  }

  console.log(`Migrated ${name} → ${activityDir}`);
  console.log(`  SCSS: ${scssPath}`);
  console.log(`  Content: ${contentPath}`);
}

const configs = [
  {
    name: 'XrosWeightChallenge',
    handle: 'xros-weight-challenge',
    htmlClass: 'xros-weight-challenge-page',
    rootClass: 'xros-weight-challenge',
    innerWrapperClass: 'uv-main',
    htmlPath: 'app/components/templates/XrosWeightChallenge/xros-weight-challenge.html',
    cssLines: [597, 2547],
    domLines: [2548, 3201],
    jsPath: 'app/components/templates/XrosWeightChallenge/componet.js',
  },
  {
    name: 'CrossWithXros5',
    handle: 'cross-with-xros-5',
    htmlClass: 'cross-with-xros-page',
    rootClass: 'cross-with-xros',
    htmlPath: 'app/components/templates/CrossWithXros5/cross-with-xros-5.html',
    cssFiles: ['app/components/templates/CrossWithXros5/cross_style.css'],
    domLines: [612, 1375],
    jsPaths: [
      'app/components/templates/CrossWithXros5/cross-animate.js',
      'app/components/templates/CrossWithXros5/cross_modal.js',
      'app/components/templates/CrossWithXros5/chart.js',
    ],
  },
  {
    name: 'InnovationX',
    handle: 'innovation-x',
    htmlClass: 'innovation-x-page',
    rootClass: 'innovation-x-page',
    htmlPath: 'app/components/templates/InnovationX/innovation-x.html',
    cssFiles: [
      'app/components/templates/InnovationX/output.css',
      'app/components/templates/InnovationX/optimization.css',
      'app/components/templates/InnovationX/pictures.css',
    ],
    domLines: [632, 3280],
    jsPaths: [
      'app/components/templates/InnovationX/index.js',
      'app/components/templates/InnovationX/optimization.js',
      'app/components/templates/InnovationX/pictures.js',
    ],
  },
];

const arg = process.argv[2] || 'all';
const toRun = arg === 'all' ? configs : configs.filter((c) => c.handle === arg || c.name === arg);
toRun.forEach(migrate);
