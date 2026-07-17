import {Xros6WorldcupLayout} from '~/components/Activity/Xros6Worldcup';

/** @type {Record<string, { title: string; description: string; Layout: React.ComponentType }>} */
export const ACTIVITY_LAYOUT_ENTRIES = {
  'xros6-worldcup': {
    title: 'XROS 6 World Cup',
    description:
      'Join the XROS 6 World Cup campaign — quiz, spin to win, and celebrate the beautiful game.',
    Layout: Xros6WorldcupLayout,
  },
};

/**
 * @param {string | undefined} handle
 */
export function resolveActivityLayout(handle) {
  if (!handle) return null;
  return ACTIVITY_LAYOUT_ENTRIES[handle] ?? null;
}
