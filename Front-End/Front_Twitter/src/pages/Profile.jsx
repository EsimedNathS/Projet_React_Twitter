import React, { useEffect, useState } from "react";
import imageZB from '../assets/Logo_Z_B.png';
import { useNavigate, useParams } from "react-router";
import { FaHome, FaBell, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import ZweezList from "../domains/zweezs/components.js/ZweezList";
import FollowingList from "../domains/users/components.jsx/FollowingList";
import { followUserService, unfollowUserService , getUserService, getFollowService } from "../domains/users/service";
import FollowButton from "../domains/users/components.jsx/FollowButton";

function Profile() {
  const { userId: profilId } = useParams();
  const [activeTab, setActiveTab] = useState("zweezs");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followsInfo, setFollowsInfo] = useState([]);

  const getUsername = async () => {
    if (profilId !== user.id) {
      const userData = await getUserService(profilId);
      setUsername(userData[0]?.username);
    }
  };

  const getFollow = async () => {
    try {

      let followData;
      console.log("main user ? :", profilId == user.id)
      if (profilId == user.id) {
        followData = await getFollowService(profilId);
      } else {
        followData = await getFollowService(profilId, user.id);
      }
      setFollowsInfo(followData);
      console.log(followData);
      

      // 🔹 Vérification si l'utilisateur actuel suit déjà le profil affiché
      const isUserFollowing = followData.followers?.some(f => f.userId === user.id);
      setIsFollowing(isUserFollowing);
    } catch (error) {
      console.error("Erreur lors de la récupération des follows:", error);
    }
  };

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUserService(user.id, profilId);
        setIsFollowing(false);
      } else {
        await followUserService(user.id, profilId);
        setIsFollowing(true);
      }
      getFollow(); // 🔹 Rafraîchir les données après follow/unfollow
    } catch (error) {
      console.error("Erreur lors du suivi/désabonnement:", error);
    }
  };

  useEffect(() => {
    setActiveTab("zweezs");
    getUsername();
    getFollow();
  }, [profilId]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-1/4 bg-black text-white p-6 flex flex-col gap-6 items-center">
        <img src={imageZB} alt="Logo" className="w-12 h-12 object-cover mb-6" />

        <button className="flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 border-transparent hover:text-gray-400" 
          onClick={() => navigate("/home")}
        >
          <FaHome size={20} />
          <span>Home</span>
        </button>

        <button className="flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 border-transparent hover:text-gray-400">
          <FaBell size={20} />
          <span>Notification</span>
        </button>

        <button className="flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 rounded font-bold bg-white text-black border-white">          
          <FaUser size={20} className="text-black"/>
          <span>Profile</span>
        </button>
      </aside>

      <div className="w-3/4 p-8">
        <div className="flex items-center gap-4 mb-3">
          <h1 className="text-4xl font-bold">{profilId == user.id ? user.username : username}</h1>

          {/* 🔹 Bouton Follow / Unfollow avec état initial mis à jour */}
          {profilId != user.id && (
            <FollowButton profilId={profilId} isFollowing={isFollowing} onFollowToggle={handleFollow} />
          )}
        </div>

        <div className="flex gap-6 text-lg text-gray-700 mb-6">
          <span><strong>{followsInfo.followersCount || 0}</strong> Followers</span>
          <span><strong>{followsInfo.followsCount || 0}</strong> Following</span>
        </div>

        {profilId == user.id && (
          <div className="flex gap-6 mb-8">
            <button 
              className={`px-6 py-2 text-lg font-medium rounded-lg transition duration-200 ${
                activeTab === "zweezs" 
                  ? "bg-white text-blue-500 border-2 border-blue-500"
                  : "bg-transparent text-gray-700 hover:bg-gray-200 hover:text-blue-500 border-2 border-transparent"
              }`}
              onClick={() => setActiveTab("zweezs")}
            >
              Zweezs
            </button> 
            <button 
              className={`px-6 py-2 text-lg font-medium rounded-lg transition duration-200 ${
                activeTab === "following" 
                  ? "bg-white text-blue-500 border-2 border-blue-500"
                  : "bg-transparent text-gray-700 hover:bg-gray-200 hover:text-blue-500 border-2 border-transparent"
              }`}
              onClick={() => setActiveTab("following")}
            >
              Following
            </button>
          </div>
        )}

        {activeTab === "zweezs" && (
          <div>
            <p className="text-xl font-semibold mb-4">Zweezs</p>
            <ZweezList userId={profilId} sortMode="Chronological"/>
          </div>
        )}

        {activeTab === "following" && <FollowingList followsInfo={followsInfo.followsData} />}
      </div>
    </div>
  );
}

export default Profile;
