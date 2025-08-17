import { useState } from "react";
import { useModalStore } from "../../stores/useModalStore";
import { useModulesByUsername } from "../../hooks/useModules";
import {
  useCreateInventory,
  useInventoriesByUser,
} from "../../hooks/useInventories";
import { useAuthStore } from "../../stores/useAuthStore";
import Modal from "./Modal";
import "./AddBasicModal.css";

const BASE_USERNAME = "base";

function AddBasicModal() {
  const isOpen = useModalStore((s) => s.activeModal);
  const onClose = useModalStore((s) => s.closeModal);
  const { user } = useAuthStore();
  const userId = user?.id;
  const { data: modules = [], isLoading } = useModulesByUsername(BASE_USERNAME);
  const { data: inventories = [] } = useInventoriesByUser(userId);
  const { mutate: addToInventory, isLoading: isAdding } = useCreateInventory();
  const [selected, setSelected] = useState({}); // { [moduleId]: quantity }
  const [error, setError] = useState("");

  const handleCheck = (moduleId, checked) => {
    setSelected((prev) => {
      const next = { ...prev };
      if (checked) {
        next[moduleId] = next[moduleId] || 1;
      } else {
        delete next[moduleId];
      }
      return next;
    });
  };

  const handleQtyChange = (moduleId, qty) => {
    let value = Number(qty);
    if (isNaN(value) || value < 0) value = 0;
    setSelected((prev) => ({ ...prev, [moduleId]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    const selectedIds = Object.keys(selected);
    if (selectedIds.length === 0) {
      setError("Please select at least one module.");
      return;
    }
    selectedIds.forEach((moduleId) => {
      addToInventory(
        { moduleId, quantity: selected[moduleId] },
        {
          onError: (err) => {
            setError(err?.message || "Failed to add to inventory");
          },
        }
      );
    });
    setSelected({});
    onClose();
  };

  // Get moduleIds already in inventory
  const inventoryModuleIds = inventories.map((inv) => inv.moduleId);
  // Filter modules to only those not in inventory
  const availableModules = modules.filter(
    (mod) => !inventoryModuleIds.includes(mod._id)
  );

  const nothingToAdd = !isLoading && availableModules.length === 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Basic Module">
      <form className="add-module-modal__form" onSubmit={handleSubmit}>
        <div className="add-module-modal__table-wrapper">
          {nothingToAdd ? (
            <div className="add-module-modal__empty-message">
              {modules.length === 0
                ? "No basic modules available."
                : "All basic modules are already in your inventory."}
            </div>
          ) : (
            <table className="add-module-modal__table">
              <thead>
                <tr>
                  <th className="add-module-modal__th-checkbox"></th>
                  <th className="add-module-modal__th-img">Image</th>
                  <th className="add-module-modal__th-name">Name</th>
                  <th className="add-module-modal__th-qty">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {availableModules.map((mod) => (
                  <tr key={mod._id} className="add-module-modal__row">
                    <td className="add-module-modal__cell-checkbox">
                      <label className="add-module-modal__checkbox-label">
                        <input
                          type="checkbox"
                          className="add-module-modal__checkbox"
                          checked={selected[mod._id] !== undefined}
                          onChange={(e) =>
                            handleCheck(mod._id, e.target.checked)
                          }
                          disabled={isAdding}
                        />
                        <span className="add-module-modal__checkbox-custom" />
                      </label>
                    </td>
                    <td className="add-module-modal__cell-img">
                      {mod.image?.url ? (
                        <img
                          src={mod.image.url}
                          alt={mod.name}
                          className="add-module-modal__img"
                        />
                      ) : (
                        <div className="add-module-modal__img add-module-modal__img--placeholder" />
                      )}
                    </td>
                    <td className="add-module-modal__cell-name">{mod.name}</td>
                    <td className="add-module-modal__cell-qty">
                      <input
                        className="add-module-modal__input add-module-modal__input--qty"
                        type="number"
                        min={0}
                        value={selected[mod._id] ?? ""}
                        onChange={(e) =>
                          handleQtyChange(mod._id, e.target.value)
                        }
                        disabled={selected[mod._id] === undefined || isAdding}
                        placeholder="Qty"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        {error && <div className="add-module-modal__error">{error}</div>}
        <div className="add-module-modal__actions">
          <button
            type="submit"
            className="add-module-modal__button add-module-modal__button--primary"
            disabled={isAdding || isLoading || nothingToAdd}
          >
            {isAdding ? "Adding..." : "Add to Inventory"}
          </button>
          <button
            type="button"
            className="add-module-modal__button"
            onClick={onClose}
            disabled={isAdding}
          >
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default AddBasicModal;
