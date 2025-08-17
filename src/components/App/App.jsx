import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Inventory from "../../pages/Inventory/Index";
import Home from "../../pages/Home/index";
import About from "../../pages/About/index";
import Profile from "../../pages/Profile/Profile";
import Login from "../../pages/Login/Login";
import Regsiter from "../../pages/Register/Register";
import NotFound from "../../pages/NotFound/NotFound";
import AuthGuard from "../AuthGuard";
import { useAuthStore } from "../../stores/useAuthStore";
import { useHydrateAuth } from "../../hooks/useHydrateAuth";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import { useModalStore } from "../../stores/useModalStore";
import AddModuleModal from "../../components/Modals/AddModuleModal";
import AddNewModal from "../../components/Modals/AddNewModal";
import AddBasicModal from "../../components/Modals/AddBasicModal";
import "./App.css";

function App() {
  const activeModal = useModalStore((s) => s.activeModal);
  const { isAuthenticated: isLoggedIn, user } = useAuthStore();
  console.log("DEBUG", { isLoggedIn, user });

  useHydrateAuth();
  const isHydrated = useAuthStore((s) => s.isHydrated);
  if (!isHydrated) {
    return <LoadingScreen message="Restoring your session..." />;
  }
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <div className="page__container">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <Profile />
                </AuthGuard>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Regsiter />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        {activeModal === "AddModuleModal" && <AddModuleModal />}
        {activeModal === "AddNewModal" && <AddNewModal />}
        {activeModal === "AddBasicModal" && <AddBasicModal />}
      </div>
    </div>
  );
}

export default App;
