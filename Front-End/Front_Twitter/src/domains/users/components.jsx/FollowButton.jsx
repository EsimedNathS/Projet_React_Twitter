import React, { useState, useEffect } from "react";
import { followUserService, unfollowUserService } from "../service";
import { useSelector } from "react-redux";

function FollowButton({ profilId, initialIsFollowing, refreshFollows }) {
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    setIsFollowing(initialIsFollowing);
  }, [initialIsFollowing]);

  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await unfollowUserService(user.id, profilId);
      } else {
        await followUserService(user.id, profilId);
      }
      setIsFollowing(!isFollowing);
      refreshFollows(); // Actualiser la liste des follows
    } catch (error) {
      console.error("Erreur lors du follow/unfollow:", error);
    }
  };

  return (
    <button
        className={`${isFollowing
            ? "bg-black text-white text-2xl px-5 py-2 border-2 rounded-full shadow-lg hover:bg-gray-800 transition min-w-[120px]"
            : "text-black text-2xl px-5 py-2 rounded-full border-2 border-solid border-black shadow-lg hover:bg-gray-200 transition min-w-[120px]"
        }`}
        onClick={handleFollow}
    >
        {isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
}

export default FollowButton;
