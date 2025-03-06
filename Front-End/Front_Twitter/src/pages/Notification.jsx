import React, { useEffect, useState } from "react";
import imageZB from '../assets/Logo_Z_B.png';
import { useNavigate } from "react-router";
import { FaHome, FaBell, FaUser } from "react-icons/fa"; 
import { useSelector } from "react-redux";
import { getNotificationsService } from "../domains/notifications/service";

function Notification() {
  const user = useSelector((state) => state.user); // Récupération de l'utilisateur connecté
  const [tabNotifications, setTabNotifications] = useState([]);
  const navigate = useNavigate();

  // Récupération des notifications
  const fetchNotifications = async () => {
    try {
      const response = await getNotificationsService(user.id);
      console.log(response);
      setTabNotifications(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="flex min-h-screen">
        <aside className="w-1/4 bg-black text-white p-6 flex flex-col gap-6 items-center">
            <img 
              src={imageZB}
              alt="Logo"
              className="w-12 h-12 object-cover mb-6"
            />
    
            <button 
              className="flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 border-transparent hover:text-gray-400"
              onClick={() => navigate(`/home`)}
            >
              <FaHome size={20} />
              <span>Home</span>
            </button>
    
            <button 
              className="flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 rounded font-bold 
                        bg-white text-black border-white"
            >
              <FaBell size={20} />
              <span>Notification</span>
            </button>
    
            <button 
              className="flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 border-transparent hover:text-gray-400"
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <FaUser size={20} />
              <span>Profile</span>
            </button>
        </aside>

        <main className="flex-1 border-x border-gray-700 bg-gray-100">
            <h2 className="text-2xl font-bold mb-4">Notifications</h2>

                {console.log(tabNotifications)}
            {tabNotifications.length === 0 ? (
                <p className="text-gray-500">Aucune notification pour le moment.</p>
            ) : (
                <ul className="space-y-3">
                {tabNotifications.map((notif) => (
                    <li key={notif.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                    {notif.type === "follow" && (
                        <p><strong>{notif.notifierId}</strong> a commencé à vous suivre.</p>
                    )}
                    {notif.type === "like" && (
                        <p><strong>{notif.notifierId}</strong> a aimé votre Zweez.</p>
                    )}
                    <span className="text-gray-400 text-sm">{new Date(notif.time).toLocaleString()}</span>
                    </li>
                ))}
                </ul>
            )}
        </main>
    </div>
  );
}

export default Notification;
