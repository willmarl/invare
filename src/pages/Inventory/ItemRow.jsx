import { useState } from "react";
import { Link } from "react-router-dom";
import { Wallpaper, Plus, Minus, Pencil, Trash2, CodeXml } from "lucide-react";
import "./ItemRow.css";

function ItemRow() {
  const [stepValue, setStepValue] = useState(1);
  const handleStepChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setStepValue(value);
    }
  };

  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
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
            src="your-image-url"
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
              <Plus className="item-row__increment-button" />
              <Minus className="item-row__increment-button" />
            </div>
          </div>
          <div className="item-row__edit-section">
            <Pencil className="item-row__edit-button" />
            <Trash2 className="item-row__edit-button" />
          </div>
        </div>
      </div>
      <div className="item-row__right">
        <div className="item-row__header">
          <div className="item-row__amount">
            Amt. <br></br> 9999
          </div>
          <div className="item-row__title">
            <p className="item-row__name">Color detector</p>
            <p className="item-row__name">TCS3200</p>
          </div>
        </div>
        <div className="item-row__right-bot">
          <div className="item-row__details">
            <div className="item-row__category">
              <div className="item-row__category-title">cat. /tags</div>
              <div className="item-row__category-tags">
                <div className="item-row__category-tag">Sensor</div>
                <div className="item-row__category-tag">Input</div>
                <div className="item-row__category-tag">Input</div>
                <div className="item-row__category-tag">Input</div>
                <div className="item-row__category-tag">Input</div>
                <div className="item-row__category-tag">Input</div>
              </div>
            </div>
            <div className="item-row__links">
              <CodeXml strokeWidth={1} className="item-row__link" />
              <div className="item-row__divider"></div>
              <Link className="item-row__link" to="/Wiki">
                Wiki
              </Link>
            </div>
          </div>
          <div className="item-row__description">
            Description Here. Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Totam laborum dolorum dolorem minus placeat,
            delectus, vero mollitia repudiandae a, blanditiis incidunt
            similique. Iste autem, doloribus magni ducimus dolores veritatis
            dolore?
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemRow;
