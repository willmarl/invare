import Hero from "./Hero";
import Features from "./Features";
import Custom from "./Custom";
import Assistant from "./Assistant";
import CTA from "./CTA";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <Hero />
      <Features />
      <Custom />
      <Assistant />
      <CTA />
    </div>
  );
}

export default Home;
