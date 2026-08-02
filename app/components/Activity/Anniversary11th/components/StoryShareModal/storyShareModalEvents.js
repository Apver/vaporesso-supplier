export const STORY_SHARE_MODAL_OPEN_EVENT =
  'anniversary-11th:open-story-share-modal';

export function openStoryShareModal() {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent(STORY_SHARE_MODAL_OPEN_EVENT),
  );
}