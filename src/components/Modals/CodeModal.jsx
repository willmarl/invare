import Modal from "./Modal";
import { useModalStore } from "../../stores/useModalStore";
import "./CodeModal.css";

function CodeModal() {
  const isOpen = useModalStore((s) => s.activeModal);
  const onClose = useModalStore((s) => s.closeModal);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Code Snippet">
      <div>Children here</div>
    </Modal>
  );
}

export default CodeModal;
