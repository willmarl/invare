import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallpaper, Plus, Minus, Pencil, Trash2, CodeXml } from "lucide-react";
import "./ItemRow.css";
import { capitalizeFirstLetter } from "../../utils/helpers";
import { useModalStore } from "../../stores/useModalStore";
import { useAuthStore } from "../../stores/useAuthStore";
import {
  useUpdateInventory,
  useDeleteInventory,
} from "../../hooks/useInventories";

function ItemRow({ item }) {
  const openModal = useModalStore((s) => s.openModal);
  const { user } = useAuthStore();
  const [stepValue, setStepValue] = useState(1);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { mutate: updateInventory } = useUpdateInventory();
  const { mutate: deleteInventory } = useDeleteInventory();

  const handleStepChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setStepValue(value);
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleIncrement = () => {
    if (stepValue > 0) {
      updateInventory({
        invId: item.invId,
        data: { quantity: item.quantity + stepValue },
      });
    }
  };

  const handleDecrement = () => {
    if (stepValue > 0) {
      const newQty = item.quantity - stepValue;
      updateInventory({
        invId: item.invId,
        data: { quantity: newQty < 0 ? 0 : newQty },
      });
    }
  };

  const handleWikiClick = () => {
    // If module is from base/system, use 'base' as username
    // If module is user's own, use user.username
    // Otherwise fallback to item.owner
    let username = item.owner;
    if (item.isOfficial || item.owner === "base") {
      username = "base";
    } else if (user && (item.owner === user.id || item.owner === user._id)) {
      username = user.username;
    }
    navigate(`/wiki/${username}/${item.slug}`);
  };

  const isUserModule =
    user && (item.owner === user.id || item.owner === user._id);
  const handleEdit = () => {
    if (isUserModule) {
      openModal("EditModal", { moduleId: item._id });
    }
  };

  const handleDelete = () => {
    openModal("DeleteModal", { invId: item.invId });
  };

  return (
    <div className="item-row">
      <div className="item-row__left">
        {imageError ? (
          <Wallpaper
            strokeWidth={0.2}
            color="#0000001f"
            className="item-row__image"
          />
        ) : (
          <img
            src={item.image?.url}
            alt="placeholder if no image"
            onError={handleImageError}
            className="item-row__image"
          />
        )}
        <div className="item-row__left-bot">
          <div className="item-row__increment">
            <div className="item-row__increment-title">
              <p className="item-row__increment-text">Increment:</p>
              <input
                value={stepValue}
                onChange={handleStepChange}
                type="number"
                className="item-row__increment-input"
                inputMode="numeric"
                min={0}
                max={9999}
              />
            </div>
            <div className="item-row__increment-buttons">
              <Plus
                className="item-row__increment-button"
                onClick={handleIncrement}
              />
              <Minus
                className="item-row__increment-button"
                onClick={handleDecrement}
              />
            </div>
          </div>
          <div className="item-row__edit-section">
            <Pencil
              className="item-row__edit-button"
              onClick={handleEdit}
              style={
                !isUserModule ? { opacity: 0.5, cursor: "not-allowed" } : {}
              }
              disabled={!isUserModule}
              title={
                isUserModule
                  ? "Edit module"
                  : "You can only edit your own modules"
              }
            />
            <Trash2 className="item-row__edit-button" onClick={handleDelete} />
          </div>
        </div>
      </div>
      <div className="item-row__right">
        <div className="item-row__header">
          <div className="item-row__amount">
            Amt. <br></br> {item.quantity}
          </div>
          <div className="item-row__title">
            <p className="item-row__name">{item.name}</p>
            <p className="item-row__name">{item?.model}</p>
          </div>
        </div>
        <div className="item-row__right-bot">
          <div className="item-row__details">
            <div className="item-row__category">
              <div className="item-row__category-title">cat. /tags</div>
              <div className="item-row__category-tags">
                {item.category?.map((cat) => (
                  <span key={cat} className="item-row__category-tag">
                    {capitalizeFirstLetter(cat)}
                  </span>
                ))}
              </div>
            </div>
            <div className="item-row__links">
              <CodeXml
                strokeWidth={1}
                className="item-row__link"
                onClick={() => openModal("CodeModal", { moduleId: item._id })}
              />
              <div className="item-row__divider"></div>
              <span
                className="item-row__link"
                style={{ cursor: "pointer" }}
                onClick={handleWikiClick}
              >
                Wiki
              </span>
            </div>
          </div>
          <div className="item-row__description">
            {item.description || "No description"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemRow;
