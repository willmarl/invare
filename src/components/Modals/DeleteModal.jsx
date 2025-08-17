import { Trash2, AlertTriangle } from "lucide-react";
import { useModalStore } from "../../stores/useModalStore";
import { useDeleteInventory } from "../../hooks/useInventories";
import Modal from "./Modal";
import "./DeleteModal.css";

function DeleteModal() {
  const isOpen = useModalStore((s) => s.activeModal);
  const onClose = useModalStore((s) => s.closeModal);
  const modalData = useModalStore((s) => s.modalData);
  const { mutate: deleteInventory, isLoading } = useDeleteInventory();

  const handleDelete = () => {
    if (modalData?.invId) {
      deleteInventory(modalData.invId, {
        onSuccess: onClose,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Confirmation">
      <div className="delete-modal">
        <div className="delete-modal__icon">
          <AlertTriangle size={40} color="#dc2626" />
        </div>
        <div className="delete-modal__text">
          <h2 className="delete-modal__title">Are you sure?</h2>
          <p className="delete-modal__desc">
            This will permanently remove this item from your inventory.
          </p>
        </div>
        <div className="delete-modal__actions">
          <button
            className="delete-modal__button delete-modal__button--danger"
            onClick={handleDelete}
            disabled={isLoading}
          >
            <Trash2 size={18} style={{ marginRight: 8 }} />
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            className="delete-modal__button"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteModal;
