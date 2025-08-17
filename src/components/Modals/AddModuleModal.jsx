import Modal from "./Modal";
import { useModalStore } from "../../stores/useModalStore";

function AddModuleModal() {
  const isOpen = useModalStore((s) => s.activeModal);
  const onClose = useModalStore((s) => s.closeModal);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Module">
      <div>Children here</div>
    </Modal>
  );
}

export default AddModuleModal;
