import { Grid3x2, BotMessageSquare, ClipboardPen } from "lucide-react";
import "./Features.css";

function Features() {
  return (
    <section className="features home__section">
      <h2 className="features__title">
        Effortlessly Track Your Arduino Module Inventory With Ease
      </h2>
      <div className="features__cards">
        <div className="features__card">
          <Grid3x2 className="features__card-icon" />
          <h3 className="features__card-title">
            Easily Add Custom Modules to Your Collection
          </h3>
          <p className="features__card-desc">
            Keep a detailed log of all your Arduino modules and their
            quantities.
          </p>
        </div>
        <div className="features__card">
          <BotMessageSquare className="features__card-icon" />
          <h3 className="features__card-title">
            Get Instant Help with Our Mini Assistant Feature
          </h3>
          <p className="features__card-desc">
            Ask questions about your inventory and get quick answers to your
            queries.
          </p>
        </div>
        <div className="features__card">
          <ClipboardPen className="features__card-icon" />
          <h3 className="features__card-title">
            Stay Organized with Comprehensive Inventory Management Tools
          </h3>
          <p className="features__card-desc">
            Manage your modules efficiently and never lose track of your
            components.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Features;
