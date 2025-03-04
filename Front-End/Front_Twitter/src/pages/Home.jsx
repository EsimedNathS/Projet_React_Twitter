import React, { useState } from "react";
import imageZB from '../assets/Logo_Z_B.png';
import { useNavigate } from "react-router";
import ZweezList from "../domains/zweezs/components.js/ZweezList";
import { FaHome, FaBell, FaUser } from "react-icons/fa";
import AuthGuard from '../domains/auth/AuthGuard';

function Home() {
  const [selectedTab, setSelectedTab] = useState("pourVous");
  const navigate = useNavigate();

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-black text-white p-4 flex flex-col gap-6 items-center">
        <img 
          src={imageZB}
          alt="Logo"
          className="w-12 h-12 object-cover"
        />

        <button className="flex items-center gap-3 text-lg hover:text-gray-400 w-full justify-start px-4">
          <FaHome size={20} />
          <span>Home</span>
        </button>

        <button className="flex items-center gap-3 text-lg hover:text-gray-400 w-full justify-start px-4">
          <FaBell size={20} />
          <span>Notification</span>
        </button>

        <button 
          className="flex items-center gap-3 text-lg hover:text-gray-400 w-full justify-start px-4"
          onClick={() => navigate("/profile")}
        >
          <FaUser size={20} />
          <span>Profile</span>
        </button>
      </aside>

      <main className="flex-1 border-x border-gray-700">
        <div className="flex justify-center border-b border-gray-700">
          <button
            className={`p-4 flex-1 text-lg ${
              selectedTab === "pourVous" ? "border-b-4 border-blue-500 font-bold" : "text-gray-400"
            }`}
            onClick={() => setSelectedTab("pourVous")}
          >
            Pour vous
          </button>
          <button
            className={`p-4 flex-1 text-lg ${
              selectedTab === "follow" ? "border-b-4 border-blue-500 font-bold" : "text-gray-400"
            }`}
            onClick={() => setSelectedTab("follow")}
          >
            Follow
          </button>
        </div>

        {/* Zone des zweezs (à compléter plus tard) */}
        <div className="p-4 text-center text-gray-500">
          <ZweezList />
        </div>
      </main>
    </div>
  );
}

export default Home;
