import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";
import ZweezList from "../domains/zweezs/components.js/ZweezList";
import FollowingList from "../domains/users/components.jsx/FollowingList";
import FollowersList from "../domains/users/components.jsx/FollowersList";
import { getUserService, getFollowService } from "../domains/users/service";
import FollowButton from "../domains/users/components.jsx/FollowButton";
import NavBar from "./components/NavBar";

function Profile() {
  const { userId: profilId } = useParams();
  const [activeTab, setActiveTab] = useState("zweezs");
  const [username, setUsername] = useState("");
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
      if (profilId == user.id) {
        followData = await getFollowService(profilId);
      } else {
        followData = await getFollowService(profilId, user.id);
      }
      setFollowsInfo(followData);
      console.log(followData);

      const isUserFollowing = followData.isMainUserFollowing;
      setIsFollowing(isUserFollowing);
    } catch (error) {
      console.error("Erreur lors de la récupération des follows:", error);
    }
  };

  const handleFollow = async () => {
    try {
      getFollow();
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
      <NavBar page="Profile"/>

      <div className="w-3/4 p-8">
        <div className="flex items-center gap-4 mb-3">
          <h1 className="text-4xl font-bold">{profilId == user.id ? user.username : username}</h1>

          {profilId != user.id && (
            <FollowButton profilId={profilId} isFollowing={isFollowing} refreshFollows={handleFollow} />
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
            <button 
              className={`px-6 py-2 text-lg font-medium rounded-lg transition duration-200 ${
                activeTab === "followers" 
                  ? "bg-white text-blue-500 border-2 border-blue-500"
                  : "bg-transparent text-gray-700 hover:bg-gray-200 hover:text-blue-500 border-2 border-transparent"
              }`}
              onClick={() => setActiveTab("followers")}
            >
              Followers
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

        {activeTab === "followers" && <FollowersList followersInfo={followsInfo.followersData} />}
      </div>
    </div>
  );
}

export default Profile;
