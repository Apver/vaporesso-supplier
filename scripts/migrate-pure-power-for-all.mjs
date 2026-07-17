#!/usr/bin/env node
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
      .replace(/\bonclick="[^"]*"/gi, '')
      .replace(/\bonclick='[^']*'/gi, '')
      .replace(/\bclass=/g, 'className=')
      .replace(/\bfor=/g, 'htmlFor=')
      .replace(/\bautoplay\b/gi, 'autoPlay')
      .replace(/\bloop\b/gi, 'loop')
      .replace(/\bmuted\b/gi, 'muted')
      .replace(/\bcontrols\b/gi, 'controls')
      .replace(/\bplaysinline\b/gi, 'playsInline')
      .replace(/\bsrcset=/gi, 'srcSet=')
      .replace(/\btabindex=/gi, 'tabIndex=')
      .replace(/\breadonly\b/gi, 'readOnly')
      .replace(/\bcrossorigin=/gi, 'crossOrigin=')
      .replace(/\breferrerpolicy=/gi, 'referrerPolicy=')
      .replace(/ style=""/g, '')
      .replace(/ className=""/g, '')
      .replace(/\bstyle="([^"]*)"/g, (match, css) => {
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
      .replace(/href=""/g, 'href="#"')
      .replace(/href="javascript:;"/g, 'href="#"')
  );
}

function readLines(filePath, start, end) {
  const lines = fs.readFileSync(filePath, 'utf8').split('\n');
  return lines.slice(start - 1, end).join('\n');
}

function extractStyleContent(text) {
  return text
    .replace(/^\s*<style[^>]*>/i, '')
    .replace(/<\/style>\s*$/i, '')
    .trim();
}

function indentCss(css, spaces = 2) {
  const pad = ' '.repeat(spaces);
  return css
    .split('\n')
    .map((line) => (line.trim() ? `${pad}${line}` : ''))
    .join('\n');
}

const handle = 'pure-power-for-all';
const htmlClass = 'pure-power-for-all-page';
const rootClass = 'pure-power-for-all';
const activityDir = path.join(ROOT, 'app/components/Activity/PurePowerForAll');
const sectionsDir = path.join(activityDir, 'sections');
const scssPath = path.join(ROOT, 'app/styles/activity/pure-power-for-all.scss');
const fetchDir = path.join(ROOT, 'tmp/pure-power-fetch');

fs.mkdirSync(sectionsDir, {recursive: true});

const pcDom = readLines(
  path.join(ROOT, 'app/components/template/pure_power_pc.html'),
  791,
  1295,
);
const mobDom = readLines(
  path.join(ROOT, 'app/components/template/pure_power_mob.html'),
  298,
  1568,
);

const pcInlineCss = extractStyleContent(
  readLines(path.join(ROOT, 'app/components/template/pure_power_pc.html'), 767, 790),
);
const mobInlineCss = extractStyleContent(
  readLines(path.join(ROOT, 'app/components/template/pure_power_mob.html'), 262, 289),
);

const pcCssFiles = ['common.css', 'index_5.css', 'bottom-1.css', 'modal.css'];
const mobCssFiles = ['common.css', 'modal.css', 'index_3-1.css'];

const pcCss = [
  ...pcCssFiles.map((f) =>
    fs.readFileSync(path.join(fetchDir, 'css-pc', f), 'utf8'),
  ),
  pcInlineCss,
].join('\n\n');

const mobCss = [
  ...mobCssFiles.map((f) =>
    fs.readFileSync(path.join(fetchDir, 'css-mob', f), 'utf8'),
  ),
  mobInlineCss,
].join('\n\n');

const scss = `html.${htmlClass} {
  scroll-behavior: auto !important;
}

.${rootClass} {
  width: 100%;
  overflow-x: clip;
}

.${rootClass} .pure-power-pc {
  display: block;
}

.${rootClass} .pure-power-mob {
  display: none;
}

@media screen and (max-width: 1023px) {
  .${rootClass} .pure-power-pc {
    display: none !important;
  }

  .${rootClass} .pure-power-mob {
    display: block !important;
  }
}

/* PC styles */
.${rootClass} .pure-power-pc {
${indentCss(pcCss)}
}

/* Mobile styles */
.${rootClass} .pure-power-mob {
${indentCss(mobCss)}
}
`;

fs.writeFileSync(scssPath, scss);

function writeSection(name, dom, wrapperClass) {
  const jsx = htmlToJsx(dom.trim());
  fs.writeFileSync(
    path.join(sectionsDir, `${name}.jsx`),
    `export function ${name}() {
  return (
    <div className="${wrapperClass}" data-ppfa="${wrapperClass === 'pure-power-pc' ? 'pc' : 'mob'}">
${jsx
  .split('\n')
  .map((l) => `      ${l}`)
  .join('\n')}
    </div>
  );
}
`,
  );
}

writeSection('PcContent', pcDom, 'pure-power-pc');
writeSection('MobContent', mobDom, 'pure-power-mob');

console.log('Generated pure-power-for-all activity scaffold');
console.log(`  SCSS: ${scssPath}`);
console.log(`  Sections: PcContent.jsx, MobContent.jsx`);
