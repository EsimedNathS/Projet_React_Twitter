import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaHeart, FaRetweet, FaComment, FaEllipsisH } from "react-icons/fa";
import AuthGuard from "../../auth/AuthGuard";

function ZweezList() {
  const zweez = useSelector((state) => state.zweez);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const zweezs = getZweezListService(verifyToken);
    console.log(zweez);
  })

  return (
    <div className="max-w-xl mx-auto bg-white p-4 border-b border-gray-200 flex gap-4">

      {/* Contenu du tweet */}
      <div className="w-full">
        {/* Header du tweet */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-bold">Nom de l'utilisateur</span>
            <span className="text-gray-500">2h</span>
          </div>
          <FaEllipsisH className="text-gray-500 cursor-pointer" />
        </div>

        {/* Contenu du tweet */}
        <p className="mt-2 text-gray-900">{zweez.content}</p>

        {/* Actions du tweet */}
        <div className="flex justify-between mt-3 text-gray-500">
          <button className="flex items-center gap-1 hover:text-blue-500">
            <FaComment />
            <span>12</span>
          </button>
          <button className="flex items-center gap-1 hover:text-green-500">
            <FaRetweet />
            <span>5</span>
          </button>
          <button className="flex items-center gap-1 hover:text-red-500">
            <FaHeart />
            <span>45</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuthGuard(ZweezList);
