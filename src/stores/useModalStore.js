import { create } from "zustand";

export const useModalStore = create((set) => ({
  activeModal: null,
  modalData: null, // e.g. selected item/note
  openModal: (modalName, data = null) =>
    set({ activeModal: modalName, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),
}));
