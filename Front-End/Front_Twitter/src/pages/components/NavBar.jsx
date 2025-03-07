import React from "react";
import imageZB from "../../assets/Logo_Z_B.png";
import { useNavigate } from "react-router";
import { FaHome, FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { disconnect } from "../../domains/auth/slice"; // Assure-toi d'avoir une action de logout dans ton store

function NavBar({ page }) {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fonction pour déterminer si un bouton est actif
  const getButtonStyle = (buttonPage) =>
    page === buttonPage
      ? "bg-white text-black border-white font-bold"
      : "border-transparent hover:text-gray-400";

  // Fonction de logout avec confirmation
  const handleLogout = () => {
    const isConfirmed = window.confirm("Voulez-vous vraiment vous déconnecter ?");
    if (isConfirmed) {
      dispatch(disconnect()); // Déconnecte l'utilisateur
      navigate("/login"); // Redirige vers la page de connexion
    }
  };

  return (
    <aside className="w-1/4 bg-black text-white p-6 flex flex-col gap-6 items-center">
      <img src={imageZB} alt="Logo" className="w-12 h-12 object-cover mb-6" />

      <button
        className={`flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 rounded ${getButtonStyle(
          "Home"
        )}`}
        onClick={() => navigate("/home")}
      >
        <FaHome size={20} />
        <span>Home</span>
      </button>

      <button
        className={`flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 rounded ${getButtonStyle(
          "Notification"
        )}`}
        onClick={() => navigate("/notif")}
      >
        <FaBell size={20} />
        <span>Notification</span>
      </button>

      <button
        className={`flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 rounded ${getButtonStyle(
          "Profile"
        )}`}
        onClick={() => navigate(`/profile/${user.id}`)}
      >
        <FaUser size={20} />
        <span>Profile</span>
      </button>

      {/* BOUTON LOGOUT */}
      <button
        className="flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 rounded border-transparent hover:text-red-500"
        onClick={handleLogout}
      >
        <FaSignOutAlt size={20} />
        <span>Logout</span>
      </button>
    </aside>
  );
}

export default NavBar;
