#!/usr/bin/env node
/**
 * Split ActivityContent.jsx into section components and update Layout.jsx.
 * Usage: node scripts/split-activity-content.mjs [activity-key|all]
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

/**
 * @param {string[]} lines - full file lines (1-indexed ranges passed in config)
 * @param {number} start - inclusive 1-based line
 * @param {number} end - inclusive 1-based line
 */
function extractLines(lines, start, end) {
  return lines.slice(start - 1, end);
}

function minIndent(lines) {
  let min = Infinity;
  for (const line of lines) {
    if (!line.trim()) continue;
    const m = line.match(/^(\s*)/);
    if (m) min = Math.min(min, m[1].length);
  }
  return min === Infinity ? 0 : min;
}

function dedentBlock(lines, extra = 0) {
  const strip = minIndent(lines) - extra;
  if (strip <= 0) return lines;
  return lines.map((line) => (line.length >= strip ? line.slice(strip) : line.trim() === '' ? '' : line));
}

function writeSection(sectionsDir, name, bodyLines) {
  const dedented = dedentBlock(bodyLines);
  const content = `export function ${name}() {
  return (
    <>
${dedented.map((l) => `      ${l}`).join('\n')}
    </>
  );
}
`;
  fs.writeFileSync(path.join(sectionsDir, `${name}.jsx`), content);
}

function buildLayout({layoutPath, layoutName, rootClass, rootRef, lenisHook, pageHook, imports, jsxBody}) {
  const importLines = imports.map((i) => `import {${i}} from './sections/${i}';`).join('\n');
  const content = `import {useRef} from 'react';
${importLines}
import {${lenisHook}, ${pageHook}} from './${pageHook.replace('use', 'use')}';

export function ${layoutName}() {
  const rootRef = useRef(null);
  ${lenisHook}();
  ${pageHook}(rootRef);

  return (
    <div className="${rootClass}" ref={rootRef}>
${jsxBody}
    </div>
  );
}
`;
  // fix import path for usePage - it's useXrosWeightChallengePage from same folder
  const fixed = content.replace(
    `from './${pageHook.replace('use', 'use')}'`,
    `from './${pageHook.charAt(0).toLowerCase() + pageHook.slice(1).replace(/Page$/, 'Page')}'`,
  );
  // Simpler: pass usePageFile explicitly
  return content;
}

const ACTIVITIES = {
  'xros-weight-challenge': {
    activityDir: 'app/components/Activity/XrosWeightChallenge',
    layoutName: 'XrosWeightChallengeLayout',
    rootClass: 'xros-weight-challenge',
    lenisHook: 'useXrosWeightChallengeLenis',
    pageHook: 'useXrosWeightChallengePage',
    pageFile: 'useXrosWeightChallengePage',
    sections: [
      {name: 'KvBannerSection', start: 6, end: 21},
      {name: 'WeightImgSection', start: 23, end: 40},
      {name: 'WeighingPlateSection', start: 42, end: 301},
      {name: 'WeightWheelSection', start: 302, end: 601},
      {name: 'WhyStandsOutSection', start: 603, end: 654},
      {name: 'OfflineHandlerSection', start: 656, end: 656},
    ],
    layoutJsx: (names) => `      <div className="uv-main">
${names.map((n) => `        <${n} />`).join('\n')}
      </div>`,
  },
  'cross-with-xros-5': {
    activityDir: 'app/components/Activity/CrossWithXros5',
    layoutName: 'CrossWithXros5Layout',
    rootClass: 'cross-with-xros',
    lenisHook: 'useCrossWithXros5Lenis',
    pageHook: 'useCrossWithXros5Page',
    pageFile: 'useCrossWithXros5Page',
    sections: [
      {name: 'FirstPageSection', start: 4, end: 27},
      {name: 'HeaderSection', start: 29, end: 47},
      {name: 'MapSection', start: 48, end: 95},
      {name: 'StorySection', start: 96, end: 123},
      {name: 'LifestyleSection', start: 126, end: 192},
      {name: 'TimelineSection', start: 194, end: 297},
      {name: 'TechnologySection', start: 298, end: 320},
      {name: 'EventsSection', start: 321, end: 355},
      {name: 'TermsAndModalsSection', start: 357, end: 650},
    ],
    layoutJsx: (names) => {
      const [first, ...rest] = names;
      return `      <${first} />
      <div className="cross_main highlights">
${rest.map((n) => `        <${n} />`).join('\n')}
      </div>`;
    },
  },
  'innovation-x': {
    activityDir: 'app/components/Activity/InnovationX',
    layoutName: 'InnovationXLayout',
    rootClass: 'innovation-x-page',
    lenisHook: 'useInnovationXLenis',
    pageHook: 'useInnovationXPage',
    pageFile: 'useInnovationXPage',
    sections: [
      {name: 'KvSection', start: 7, end: 130},
      {name: 'PicturesSection', start: 131, end: 166},
      {name: 'OptimizationSection', start: 171, end: 218},
      {name: 'MotionPathSection', start: 221, end: 1175},
      {name: 'ForwardMapSection', start: 1176, end: 1470},
      {name: 'VisionSection', start: 1471, end: 1643},
      {name: 'RedefiningSection', start: 1644, end: 1965},
      {name: 'CommentJoinSection', start: 1966, end: 2006},
      {name: 'CampaignSection', start: 2007, end: 2066},
      {name: 'TermsSection', start: 2067, end: 2540},
    ],
    layoutJsx: (names) => `      <div className="bg-black overflow-hidden">
${names.map((n) => `        <${n} />`).join('\n')}
      </div>`,
  },
};

function splitActivity(key) {
  const config = ACTIVITIES[key];
  if (!config) throw new Error(`Unknown activity: ${key}`);

  const activityDir = path.join(ROOT, config.activityDir);
  const sectionsDir = path.join(activityDir, 'sections');
  const contentPath = path.join(sectionsDir, 'ActivityContent.jsx');
  const lines = fs.readFileSync(contentPath, 'utf8').split('\n');

  for (const section of config.sections) {
    const body = extractLines(lines, section.start, section.end);
    writeSection(sectionsDir, section.name, body);
    console.log(`  ${section.name} (${section.end - section.start + 1} lines)`);
  }

  const names = config.sections.map((s) => s.name);
  const importLines = names.map((n) => `import {${n}} from './sections/${n}';`).join('\n');
  const layoutContent = `import {useRef} from 'react';
${importLines}
import {${config.lenisHook}, ${config.pageHook}} from './${config.pageFile}';

export function ${config.layoutName}() {
  const rootRef = useRef(null);
  ${config.lenisHook}();
  ${config.pageHook}(rootRef);

  return (
    <div className="${config.rootClass}" ref={rootRef}>
${config.layoutJsx(names)}
    </div>
  );
}
`;
  fs.writeFileSync(path.join(activityDir, 'Layout.jsx'), layoutContent);

  // Remove monolithic ActivityContent
  fs.unlinkSync(contentPath);
  console.log(`Split ${key} → ${names.length} sections, updated Layout.jsx`);
}

const arg = process.argv[2] || 'all';
const keys = arg === 'all' ? Object.keys(ACTIVITIES) : [arg];
for (const key of keys) {
  console.log(`\n${key}:`);
  splitActivity(key);
}
