import {
  Wrench,
  Sparkles,
  Lightbulb,
  Github,
  BookOpenCheck,
  Code2,
  Users,
} from "lucide-react";
import "./Project.css";

function Project() {
  return (
    <section className="about-project">
      <h2 className="about-project__heading">
        <Sparkles
          size={22}
          style={{ verticalAlign: "-3px", color: "#22c55e" }}
        />{" "}
        Project Philosophy
      </h2>
      <ul className="about-project__philosophy">
        <li>
          <Wrench size={18} className="about-project__icon" />{" "}
          Developer-extendable
        </li>
        <li>
          <Users size={18} className="about-project__icon" /> Minimal
        </li>
        <li>
          <Lightbulb size={18} className="about-project__icon" /> Future-focused
          (planning, compatibility, codegen)
        </li>
      </ul>
      <div className="about-project__links">
        <a
          href="https://github.com/willmarl/invare"
          target="_blank"
          rel="noopener noreferrer"
          className="about-project__link"
        >
          <Github size={18} style={{ marginRight: 4 }} /> Frontend Repo
        </a>
        <a
          href="https://github.com/willmarl/invare-api"
          target="_blank"
          rel="noopener noreferrer"
          className="about-project__link"
        >
          <Github size={18} style={{ marginRight: 4 }} /> Backend Repo
        </a>
        <span className="about-project__license">
          MIT License — free to use, self-host, and improve.
        </span>
      </div>
      <div className="about-project__roadmap">
        <h3 className="about-project__roadmap-title">
          <BookOpenCheck
            size={18}
            style={{ verticalAlign: "-3px", color: "#2563eb" }}
          />{" "}
          What's Coming
        </h3>
        <ul className="about-project__roadmap-list">
          <li>
            <Code2 size={16} className="about-project__roadmap-icon" /> Snippet
            toggle between Arduino / MicroPython
          </li>
          <li>
            <BookOpenCheck size={16} className="about-project__roadmap-icon" />{" "}
            Wiki page with expandable module details
          </li>
          <li>
            <Lightbulb size={16} className="about-project__roadmap-icon" />{" "}
            Project planner mode: “What can I build with what I have?”
          </li>
        </ul>
      </div>
      <blockquote className="about-project__quote">
        <span>
          <Sparkles size={18} style={{ marginRight: 6, color: "#22c55e" }} />{" "}
          Built for makers. Powered by code. Organized by you.
        </span>
      </blockquote>
    </section>
  );
}

export default Project;
