import { Link } from "react-router-dom";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <h2 className="hero__title">Manage Your Modules Effortlessly</h2>
      <p className="hero__desc">
        Invare is a smart inventory and assistant tool designed for makers,
        hobbyists, and hardware tinkerers. Whether you're working with Arduino,
        Raspberry Pi, or ESP boards, Invare helps you keep track of your modules
        and components with ease. Add items from a curated list of common
        electronics or create your own custom entries.
      </p>
      <p className="hero__desc">
        Need help planning a project? The built-in AI assistant can answer
        questions based on your inventory, like “Do I have anything that can
        power this motor?” or “What sensors do I have for temperature?” — saving
        you time and guesswork.
      </p>
      <Link className="hero__cta" to={"/register"}>
        Get Started
      </Link>
    </section>
  );
}

export default Hero;
