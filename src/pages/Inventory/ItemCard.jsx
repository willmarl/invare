import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Wallpaper,
  Plus,
  Minus,
  Pencil,
  Trash2,
  CodeXml,
  BookOpen,
} from "lucide-react";
import "./ItemCard.css";
import { useModalStore } from "../../stores/useModalStore";
import { useAuthStore } from "../../stores/useAuthStore";
import {
  useUpdateInventory,
  useDeleteInventory,
} from "../../hooks/useInventories";

function ItemCard({ item }) {
  const openModal = useModalStore((s) => s.openModal);
  const { user } = useAuthStore();
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();
  const { mutate: updateInventory } = useUpdateInventory();
  const { mutate: deleteInventory } = useDeleteInventory();

  const handleImageError = () => {
    setImageError(true);
  };

  const handleIncrement = () => {
    updateInventory({
      invId: item.invId,
      data: { quantity: item.quantity + 1 },
    });
  };

  const handleDecrement = () => {
    const newQty = item.quantity - 1;
    updateInventory({
      invId: item.invId,
      data: { quantity: newQty < 0 ? 0 : newQty },
    });
  };

  const handleWikiClick = () => {
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
    <div className="item-card">
      <div className="item-card__image-wrap">
        {imageError ? (
          <Wallpaper
            strokeWidth={0.2}
            color="#0000001f"
            className="item-card__image"
          />
        ) : (
          <img
            src={item.image?.url}
            alt="placeholder if no image"
            onError={handleImageError}
            className="item-card__image"
          />
        )}
        <div className="item-card__amount">Amt: {item.quantity}</div>
      </div>
      <div className="item-card__content">
        <div className="item-card__header">
          <h2 className="item-card__title">{item.name}</h2>
        </div>
        <div className="item-card__increment-buttons">
          <Plus
            className="item-card__increment-button"
            onClick={handleIncrement}
          />
          <Minus
            className="item-card__increment-button"
            onClick={handleDecrement}
          />
        </div>
        <div className="item-card__actions">
          <CodeXml
            className="item-card__action-button"
            onClick={() => openModal("CodeModal", { moduleId: item._id })}
            title="View code"
          />
          <BookOpen
            className="item-card__action-button"
            onClick={handleWikiClick}
            style={{ cursor: "pointer" }}
            title="Wiki"
          />
          <Pencil
            className="item-card__action-button"
            onClick={handleEdit}
            style={!isUserModule ? { opacity: 0.5, cursor: "not-allowed" } : {}}
            disabled={!isUserModule}
            title={
              isUserModule
                ? "Edit module"
                : "You can only edit your own modules"
            }
          />
          <Trash2
            className="item-card__action-button"
            onClick={handleDelete}
            title="Delete"
          />
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
