import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallpaper, Plus, Minus, Pencil, Trash2, CodeXml } from "lucide-react";
import "./ItemCard.css";

function ItemCard() {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="item-card">
      <h2 className="item-card__title">Card title</h2>
      {imageError ? (
        <Wallpaper
          strokeWidth={0.2}
          color="#0000001f"
          className="item-card__image"
        />
      ) : (
        <img
          src="your-image-url"
          alt="placeholder if no image"
          onError={handleImageError}
          className="item-card__image"
        />
      )}
      <div className="item-card__details">
        <div className="item-card__increment">
          <div className="item-card__amount">Amt: 9999</div>
          <div className="item-card__increment-buttons">
            <Plus className="item-card__increment-button" />
            <Minus className="item-card__increment-button" />
          </div>
        </div>
        <div className="item-card__actions">
          <CodeXml className="item-card__action-button" />
          <Pencil className="item-card__action-button" />
        </div>
      </div>
    </div>
  );
}

export default ItemCard;
