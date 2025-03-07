import React, { useEffect, useState } from "react";
import imageZB from "../assets/Logo_Z_B.png";
import { useNavigate } from "react-router";
import { FaHome, FaBell, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getNotificationsService } from "../domains/notifications/service";
import { getUserService } from "../domains/users/service"; // Pour récupérer le username
import NavBar from "./components/NavBar";

function Notification() {
  const user = useSelector((state) => state.user);
  const [tabNotifications, setTabNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.id) {
      fetchNotifications();
    }
  }, [user.id]);

  const fetchNotifications = async () => {
    try {
      const response = await getNotificationsService(user.id);

      // Récupérer les infos des users qui ont notifié
      const notificationsWithUsernames = await Promise.all(
        response.map(async (notif) => {
          const notifierUser = await getUserService(notif.notifierId);
          console.log(notifierUser);
          return {
            ...notif,
            notifierUsername: notifierUser[0]?.username,
          };
        })
      );

      setTabNotifications(notificationsWithUsernames);
    } catch (error) {
      console.error("Erreur lors de la récupération des notifications:", error);
    }
  };

  return (
    <div className="flex min-h-screen">
      <NavBar page="Notification"/>

      <main className="flex-1 border-x border-gray-700 bg-gray-100 p-6">
        <h2 className="text-2xl font-bold mb-4">Notifications</h2>

        {tabNotifications.length === 0 ? (
          <p className="text-gray-500">Aucune notification pour le moment.</p>
        ) : (
          <ul className="space-y-3">
            {tabNotifications.map((notif) => (
              <li key={notif.id} className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
                {notif.type === "follow" && (
                  <p>
                    <strong>{notif.notifierUsername}</strong> a commencé à vous suivre.
                  </p>
                )}
                {notif.type === "like" && (
                  <p>
                    <strong>{notif.notifierUsername}</strong> a aimé votre Zweez.
                  </p>
                )}
                <span className="text-gray-400 text-sm">
                  {new Date(notif.time).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}

export default Notification;
