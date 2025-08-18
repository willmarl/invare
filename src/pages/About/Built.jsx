import "./Built.css";

function Built() {
  return (
    <section className="about-built">
      <h2 className="about-built__heading">Built With</h2>
      <ul className="about-built__list">
        <li>
          <strong>Frontend:</strong> React + Vite, React Hook Form + Yup, Ky,
          Zustand, BEM styling
        </li>
        <li>
          <strong>Backend:</strong> Node.js + Express + MongoDB
        </li>
        <li>
          <strong>AI:</strong> OpenAI GPT API (inventory-aware prompts)
        </li>
        <li>
          <strong>Deployment:</strong> Friendly for local or public hosting
        </li>
      </ul>
    </section>
  );
}

export default Built;
