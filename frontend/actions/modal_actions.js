export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, productId) => ({
  type: OPEN_MODAL,
  modal,
  productId
});

export const closeModal = () => ({
  type: CLOSE_MODAL
});