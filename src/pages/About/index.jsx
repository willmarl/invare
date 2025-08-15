import Hero from "./Hero";
import Info from "./Info";
import Built from "./Built";
import Project from "./Project";
import "./About.css";

function About() {
  return (
    <div className="about">
      <Hero />
      <Info />
      <Built />
      <Project />
    </div>
  );
}

export default About;
