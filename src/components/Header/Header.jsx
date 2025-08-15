import Logo from "../../../public/invare-icon.svg";
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";
import { useLogout } from "../../hooks/useAuth";
import { useAuthStore } from "../../stores/useAuthStore";
import "./Header.css";

function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const { isAuthenticated: isLoggedIn, user } = useAuthStore();

  const { mutate: logout } = useLogout();

  const toggleDropdown = () => setIsDropdownOpen((v) => !v);
  const toggleMobileNav = () => setIsMobileNavOpen((v) => !v);

  const closeMobileNav = () => setIsMobileNavOpen(false);

  const customClassName = ({ isActive }) =>
    "header__nav-link" + (isActive ? " header__nav-link_active" : "");

  return (
    <header className="header">
      <div className="header__inner">
        {/* Left: logo */}
        <Link to="/" className="header__logo" onClick={closeMobileNav}>
          <img className="header__logo-image" src={Logo} alt="invare logo" />
          <h1 className="header__logo-text">Invare</h1>
        </Link>
        {/* Mobile menu toggle (hidden on desktop) */}
        <button
          className="header__menu-toggle"
          aria-label={isMobileNavOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileNavOpen}
          aria-controls="primary-navigation"
          onClick={toggleMobileNav}
        >
          {isMobileNavOpen ? <X /> : <Menu />}
        </button>
        {/* Center: primary nav */}
        <nav
          id="primary-navigation"
          className={
            "header__nav" + (isMobileNavOpen ? " header__nav_open" : "")
          }
        >
          <ul className="header__nav-list" onClick={closeMobileNav}>
            <li>
              <NavLink className={customClassName} to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink className={customClassName} to="/wiki">
                Wiki
              </NavLink>
            </li>
            <li>
              <NavLink className={customClassName} to="/inventory">
                Inventory
              </NavLink>
            </li>
          </ul>
        </nav>
        {/* Right: user or auth buttons */}
        <div className="header__user">
          {isLoggedIn ? (
            <>
              <div
                onClick={toggleDropdown}
                className="header__user-container"
                role="button"
                aria-haspopup="menu"
                aria-expanded={isDropdownOpen}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggleDropdown();
                }}
              >
                <img src="#" alt="" className="header__user-image" />
                <span className="header__username">{user?.username}</span>
                <button
                  className="header__user-button"
                  aria-label={
                    isDropdownOpen ? "Collapse user menu" : "Expand user menu"
                  }
                  tabIndex={-1}
                >
                  {isDropdownOpen ? <ChevronUp /> : <ChevronDown />}
                </button>
              </div>
              {isDropdownOpen && (
                <div className="header__dropdown" role="menu">
                  <ul className="header__dropdown-list">
                    <li>
                      <NavLink to="/profile" className="header__dropdown-link">
                        Profile
                      </NavLink>
                    </li>
                    {/* <li>
                      <NavLink to="/settings" className="header__dropdown-link">
                        Settings
                      </NavLink>
                    </li> */}
                    <li>
                      <button
                        onClick={() => logout()}
                        className="header__dropdown-button"
                      >
                        Sign Out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </>
          ) : (
            <div className="header__auth">
              <Link
                to="/login"
                className="header__auth-btn header__auth-btn_login"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="header__auth-btn header__auth-btn_signup"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
