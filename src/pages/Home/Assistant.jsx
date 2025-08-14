import placeholder from "../../assets/placeholder.png";
import { Bot } from "lucide-react";
import "./Assistant.css";

function Assistant() {
  return (
    <section className="assistant home__section">
      <div className="assistant__icon">
        <Bot />
      </div>
      <h2 className="assistant__title">
        Introducing Your Personal Mini Assistant for Arduino Module Management
      </h2>
      <p className="assistant__desc">
        Our Mini Assistant simplifies your Arduino projects by providing instant
        access to your inventory. Ask questions like, 'Do I have a module to
        power this servo?' and get quick, tailored responses.
      </p>
      <img
        className="assistant__img"
        src={placeholder}
        alt="image of assistant modal answering user's question"
      />
    </section>
  );
}

export default Assistant;
