import {PhotoDemoLayout} from '~/components/Activity/PhotoDemo';
import {Xros6WorldcupLayout} from '~/components/Activity/Xros6Worldcup';
import {Anniversary11thLayout} from '~/components/Activity/Anniversary11th';

/** @type {Record<string, { title: string; description: string; Layout: React.ComponentType }>} */
export const ACTIVITY_LAYOUT_ENTRIES = {
  'photo-demo': {
    title: 'Photo Wall Demo',
    description: 'Demo page for the ui-v4 PhotoWall component.',
    Layout: PhotoDemoLayout,
  },
  'xros6-worldcup': {
    title: 'XROS 6 World Cup',
    description:'Join the XROS 6 World Cup campaign — quiz, spin to win, and celebrate the beautiful game.',
    Layout: Xros6WorldcupLayout,
  },
   'anniversary-11th': {
    title: 'XROS 6 World Cup',
    description:'Join the XROS 6 World Cup campaign — quiz, spin to win, and celebrate the beautiful game.',
    Layout: Anniversary11thLayout,
  },
};

/**
 * @param {string | undefined} handle
 */
export function resolveActivityLayout(handle) {
  if (!handle) return null;
  return ACTIVITY_LAYOUT_ENTRIES[handle] ?? null;
}
