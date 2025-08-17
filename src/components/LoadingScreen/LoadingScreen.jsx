// components/LoadingScreen.jsx
import "./LoadingScreen.css";

export default function LoadingScreen({ message = "Checking session..." }) {
  return (
    <div className="loading-screen">
      <div className="loading-screen__overlay" />
      <div className="loading-screen__content">
        <div className="loading-screen__dots">
          <div className="loading-screen__dot" />
          <div className="loading-screen__dot" />
          <div className="loading-screen__dot" />
        </div>
        <p className="loading-screen__message">{message}</p>
      </div>
    </div>
  );
}
