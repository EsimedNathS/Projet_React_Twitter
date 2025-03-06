import React from "react";
import { useNavigate } from "react-router";

function FollowingList({ followsInfo }) {
  const navigate = useNavigate();

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  return (
    <div>
      <p className="text-xl font-semibold mb-4">Following</p>
      <div className="flex flex-col gap-4">
        {followsInfo.length > 0 ? (
          followsInfo.map((follow) => (
            <div 
              key={follow[0].userId} 
              className="bg-white p-4 rounded-xl shadow flex items-center gap-4 cursor-pointer"
              onClick={() => handleUserClick(follow[0].id)} // Ajout du clic
            >
              <div className="w-10 h-10 flex items-center justify-center bg-gray-300 rounded-full text-white font-bold">
                {follow[0].username.charAt(0).toUpperCase()}
              </div>
              <p className="text-gray-800 font-medium">{follow[0].username}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Aucun utilisateur suivi.</p>
        )}
      </div>
    </div>
  );
}

export default FollowingList;
