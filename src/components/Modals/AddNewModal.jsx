import Modal from "./Modal";
import { useModalStore } from "../../stores/useModalStore";

function AddNewModal() {
  const isOpen = useModalStore((s) => s.activeModal);
  const onClose = useModalStore((s) => s.closeModal);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload New Module">
      <div>Children here</div>
    </Modal>
  );
}

export default AddNewModal;
