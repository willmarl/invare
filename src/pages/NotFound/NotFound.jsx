import "./NotFound.css";
import { AlertTriangle } from "lucide-react";

function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__icon">
        <AlertTriangle size={48} />
      </div>
      <h1 className="not-found__title">404</h1>
      <p className="not-found__message">
        Sorry, the page you are looking for does not exist.
      </p>
      <a className="not-found__link" href="/">
        Go Home
      </a>
    </div>
  );
}

export default NotFound;
