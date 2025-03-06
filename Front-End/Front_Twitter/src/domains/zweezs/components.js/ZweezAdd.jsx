import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addZweezService } from '../service';

function ZweezAdd() {
    const [content, setContent] = useState(""); // État du tweet
    const user = useSelector((state) => state.user);
    

    const handlePublish = async () => {
        if (!content.trim()) return;
    
        try {
            const response = await addZweezService(content, user.id, user.username);
            setContent("");
        } catch (error) {
          console.error("Erreur lors de la publication :", error);
        }
      };

      return (
        <div className="py-2">
            <div className="w-[90%] mx-auto bg-white p-2 rounded-xl shadow mb-2 border border-gray-300 flex gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-gray-300 rounded-full text-white font-bold text-lg">
                    {user?.username ? user.username.charAt(0).toUpperCase() : "?"}
                </div>

                <div className="w-full flex flex-col gap-2">
                    <div className="font-bold">{user?.username }</div>

                    <textarea
                        className="w-full p-1 resize-none focus:outline-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button
                        className="self-end bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition"
                        onClick={handlePublish}
                    >
                        Publish
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ZweezAdd