import { Link } from "react-router-dom";
import "./CTA.css";

function CTA() {
  return (
    <section className="cta home__section">
      <h2 className="cta__title">Manage Your Arduino Modules Today</h2>
      <p className="cta__desc">Easily track and organize your inventory.</p>
      <Link to="/register" className="cta__button">
        Get Started
      </Link>
    </section>
  );
}

export default CTA;
