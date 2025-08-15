import "./Guest.css";

import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Guest() {
  const navigate = useNavigate();
  return (
    <div className="guest">
      <div className="guest__icon">
        <LogIn size={48} />
      </div>
      <div className="guest__message">
        <h2 className="guest__title">Welcome!</h2>
        <p className="guest__text">
          Please{" "}
          <span
            className="guest__action"
            onClick={() => navigate("/login")}
            tabIndex={0}
            role="button"
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && navigate("/login")
            }
          >
            login
          </span>{" "}
          or{" "}
          <span
            className="guest__action"
            onClick={() => navigate("/register")}
            tabIndex={0}
            role="button"
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && navigate("/register")
            }
          >
            register
          </span>{" "}
          to start tracking your modules.
        </p>
      </div>
    </div>
  );
}

export default Guest;
