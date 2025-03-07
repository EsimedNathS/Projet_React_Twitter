import React from "react";
import imageZB from "../../assets/Logo_Z_B.png";
import { useNavigate } from "react-router";
import { FaHome, FaBell, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { disconnect } from "../../domains/auth/slice";

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
      dispatch(disconnect());
      navigate("/login");
    }
  };

  return (
    <aside className="bg-black text-white p-4 md:p-6 flex flex-col items-center gap-6 
                     w-16 md:w-1/4 transition-all duration-300">
      <img src={imageZB} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 object-cover mb-4 md:mb-6" />

      <button
        className={`flex flex-col md:flex-row items-center gap-3 text-lg w-full 
                    justify-center md:justify-start px-2 md:px-4 py-2 border-2 rounded ${getButtonStyle("Home")}`}
        onClick={() => navigate("/home")}
      >
        <FaHome size={20} />
        <span className="hidden md:inline">Home</span>
      </button>

      <button
        className={`flex flex-col md:flex-row items-center gap-3 text-lg w-full 
                    justify-center md:justify-start px-2 md:px-4 py-2 border-2 rounded ${getButtonStyle("Notification")}`}
        onClick={() => navigate("/notif")}
      >
        <FaBell size={20} />
        <span className="hidden md:inline">Notification</span>
      </button>

      <button
        className={`flex flex-col md:flex-row items-center gap-3 text-lg w-full 
                    justify-center md:justify-start px-2 md:px-4 py-2 border-2 rounded ${getButtonStyle("Profile")}`}
        onClick={() => navigate(`/profile/${user.id}`)}
      >
        <FaUser size={20} />
        <span className="hidden md:inline">Profile</span>
      </button>

      <button
        className="flex flex-col md:flex-row items-center gap-3 text-lg w-full 
                   justify-center md:justify-start px-2 md:px-4 py-2 border-2 rounded 
                   border-transparent hover:text-red-500"
        onClick={handleLogout}
      >
        <FaSignOutAlt size={20} />
        <span className="hidden md:inline">Logout</span>
      </button>
    </aside>
  );
}

export default NavBar;
