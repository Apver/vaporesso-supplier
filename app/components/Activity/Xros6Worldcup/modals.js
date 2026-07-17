export function openModal(selector) {
  const modal = document.querySelector(selector);
  if (!modal) return;

  const modalCnt = modal.querySelector('.qes-modal-dlo-wrapper');
  const closeBtn = modal.querySelector('.qes-close-btn');

  modal.classList.add('active');
  document.documentElement.style.overflow = 'hidden';
  document.body.style.overflow = 'hidden';
  requestAnimationFrame(() => modalCnt?.classList.add('qes-show'));

  const closeModal = () => {
    modalCnt?.classList.remove('qes-show');
    window.setTimeout(() => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }, 300);
  };

  if (closeBtn) {
    closeBtn.onclick = closeModal;
  }

  modal.onclick = (e) => {
    if (e.target === modal) closeModal();
  };
}

export const openQeserrorModal = () => openModal('.qes-error-modal-content');
export const openTimeEndModal = () => openModal('.time-end-modal-content');
export const openQesSucessModal = () => openModal('.que-sucess-modal-content');
export const openNoWinModal = () => openModal('.no-win-modal-content');
export const openWinModal = () => openModal('.win-sucess-modal-content');
