import React, { useState } from "react";
import { useSelector } from "react-redux";
import { addZweezService } from '../service';
import { toast } from "react-toastify";

function ZweezAdd() {
    const [content, setContent] = useState(""); // État du texte
    const [isPublishing, setIsPublishing] = useState(false); // État pour savoir si on publie
    const user = useSelector((state) => state.user);

    const handlePublish = async () => {
        if (!content.trim()) return; // Si le champ est vide, on ne publie pas

        setIsPublishing(true); // On commence la publication
        try {
            const response = await addZweezService(content, user.id, user.username);
            toast.success("publie");
            setContent(""); // Réinitialise le champ après publication
        } catch (error) {
            console.error("Erreur lors de la publication :", error);
        } finally {
            setIsPublishing(false); // Remet l'état à 'non-publiant' une fois terminé
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
                        className="w-full p-1 resize-none"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    <button
                        className={`self-end bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 transition ${isPublishing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={handlePublish}
                        disabled={isPublishing} // Désactive le bouton pendant la publication
                    >
                        {isPublishing ? 'Publishing...' : 'Publish'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ZweezAdd;
