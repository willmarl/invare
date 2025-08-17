import Modal from "./Modal";
import { useModalStore } from "../../stores/useModalStore";

function AddBasicModal() {
  const isOpen = useModalStore((s) => s.activeModal);
  const onClose = useModalStore((s) => s.closeModal);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="List of Basic Modules">
      <div>Children here</div>
    </Modal>
  );
}

export default AddBasicModal;
