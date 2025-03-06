import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaRetweet, FaComment, FaEllipsisH, FaTrashAlt, FaEdit, FaArrowLeft } from "react-icons/fa";
import { addLikeZweezService, supLikeZweezService, supZweezService, modifZweezService } from "../service";
import { useNavigate } from "react-router";
import AuthGuard from "../../auth/AuthGuard";

function ZweezItem({ zweez, onUpdate }) {
  const token = useSelector((state) => state.authentification.token);
  const userData = useSelector((state) => state.user);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(zweez.content);
  const navigate = useNavigate();

  const userHasLiked = zweez.likes?.some((like) => like.userId === userData.id);
  const [isLiked, setIsLiked] = useState(userHasLiked);
  const [likeCount, setLikeCount] = useState(zweez.likes?.length || 0);

  const handleLike = async () => {
    if (!token || !userData.id) return;

    try {
      if (isLiked) {
        // Unliker
        await supLikeZweezService(userData.id, zweez.id);
        setLikeCount((prev) => Math.max(0, prev - 1));
      } else {
        // Liker
        await addLikeZweezService(userData.id, zweez.id);
        setLikeCount((prev) => prev + 1);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error("Erreur lors du like/unlike :", error);
    }
  };

  const handleMenuClick = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const handleDelete = async () => {
    try {
      const response = await supZweezService(zweez.id);
      onUpdate();
    } catch (error) {
      console.error("Erreur lors de la suppression du Zweez :", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setIsMenuVisible(false);
  };

  const handleFinalEdit = async () => {
    try {
      const response = await modifZweezService(zweez.id, userData.id, userData.username, editedContent, zweez.time);
      setIsEditing(false);
      onUpdate();
    } catch (error) {
      console.error("Erreur lors de la modification du Zweez :", error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false); 
    setEditedContent(zweez.content);
  };

  return (
    <div className="w-[90%] mx-auto bg-white p-6 rounded-xl shadow mb-6 border border-gray-300 flex gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full text-white font-bold text-lg">
        {zweez.username ? zweez.username.charAt(0).toUpperCase() : "?"}
        </div>

        <div className="w-full">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                <span 
                    className="font-bold cursor-pointer text-black hover:text-gray-500" // Ajout de l'effet hover ici
                    onClick={() => navigate(`/profile/${zweez.userId}`)} 
                >
                    {zweez?.username}
                </span>

                <span className="text-gray-500 text-sm">{formatTime(zweez.time)}</span>
                </div>
                {userData.id === zweez.userId && (
                    <FaEllipsisH
                    className="text-gray-500 cursor-pointer hover:text-black"
                    onClick={handleMenuClick}
                    />
                )}
            </div>

            {isMenuVisible && userData.id === zweez.userId && (
              <div className="absolute bg-white shadow-lg rounded-md mt-2 p-2 right-0 w-48">
                  <button
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-500 w-full"
                    onClick={handleEdit}
                  >
                    <FaEdit className="text-lg" />
                    Modify
                  </button>
                  <button
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-red-500 w-full mt-2"
                    onClick={handleDelete}
                  >
                    <FaTrashAlt className="text-lg" />
                    Delete
                  </button>
              </div>
            )}

            {isEditing ? (
              <div className="mt-2">
                <textarea
                  className="w-full p-1 resize-none focus:outline-none"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-300 text-white rounded mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleFinalEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Modify
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-2 text-gray-900 text-left">{zweez.content || "Aucun contenu"}</p>
            )}


            <div className="flex justify-between mt-3 text-gray-500">
                <button
                    className={`flex items-center gap-1 transition ${
                    isLiked ? "text-red-500" : "hover:text-red-500"
                    }`}
                    onClick={handleLike}
                >
                    <FaHeart className="text-lg" />
                    <span className="w-6 text-center">{likeCount}</span>
                </button>
            </div>
        </div>
    </div>
  );
}

/**
 * Fonction utilitaire pour formater le temps
 */
function formatTime(timestamp) {
    if (!timestamp) return "Il y a un moment";
  
    const now = new Date();
    const date = new Date(timestamp);
    const diffMinutes = Math.floor((now - date) / 60000); // Différence en minutes
  
    if (diffMinutes < 1) return "À l'instant";
    if (diffMinutes < 60) return `Il y a ${diffMinutes} min`;
  
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `Il y a ${diffHours} h`;
  
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) return `Il y a ${diffDays} jour${diffDays > 1 ? "s" : ""}`;
  
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `Il y a ${diffMonths} mois`;
  
    const diffYears = Math.floor(diffMonths / 12);
    return `Il y a ${diffYears} an${diffYears > 1 ? "s" : ""}`;
  }
  
export default AuthGuard(ZweezItem);
