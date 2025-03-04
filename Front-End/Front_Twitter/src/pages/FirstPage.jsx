import React from 'react';
import imageZ from "../assets/Logo_Z.png"
import { useNavigate } from "react-router";

function FirstPage() {

    const navigate = useNavigate();

    return (
        <div className="flex h-screen">
        <div className="w-1/2 flex items-center justify-center">
            <img 
            src={imageZ}
            alt="Illustration" 
            className="w-3/4 rounded-2xl"
            />
        </div>

        <div className="w-1/2 flex flex-col justify-center items-center">
            <h1 className="text-6xl font-bold text-black mb-8">Bienvenue</h1>
            
            <div className="flex gap-4">
                <button 
                className="text-black text-2xl px-8 py-4 rounded-full border-2 border-solid border-black shadow-lg hover:bg-gray-200 transition"
                onClick={() => navigate("/login")}>
                    Login
                </button>
                <button 
                className="bg-black text-white text-2xl px-8 py-4 rounded-full shadow-lg hover:bg-gray-800 transition"
                onClick={() => navigate("/signup")}>
                    Sign In
                </button>
            </div>
        </div>
        </div>
    );
}

export default FirstPage;
