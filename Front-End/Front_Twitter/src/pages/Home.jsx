import React, { useState } from "react";
import imageZB from '../assets/Logo_Z_B.png';
import { useNavigate } from "react-router";
import ZweezList from "../domains/zweezs/components.js/ZweezList";
import { FaHome, FaBell, FaUser } from "react-icons/fa";
import ZweezAdd from "../domains/zweezs/components.js/ZweezAdd";
import { useSelector } from "react-redux";

function Home() {
  const [selectedTab, setSelectedTab] = useState("forYou");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      <aside className="w-1/4 bg-black text-white p-6 flex flex-col gap-6 items-center">
        <img 
          src={imageZB}
          alt="Logo"
          className="w-12 h-12 object-cover mb-6"
        />

        <button 
          className="flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 rounded font-bold 
                    bg-white text-black border-white"
        >
          <FaHome size={20} className="text-black" />
          <span>Home</span>
        </button>

        <button 
          className="flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 border-transparent hover:text-gray-400"
        >
          <FaBell size={20} />
          <span>Notification</span>
        </button>

        <button 
          className="flex items-center gap-3 text-lg w-full justify-start px-4 py-2 border-2 border-transparent hover:text-gray-400"
          onClick={() => navigate(`/profile/${user.id}`)}
        >
          <FaUser size={20} />
          <span>Profile</span>
        </button>
      </aside>


      <main className="flex-1 border-x border-gray-700 bg-gray-100">
        <div className="flex justify-center border-b border-gray-700">
          <button
            className={`p-4 flex-1 text-lg ${
              selectedTab === "forYou" ? "border-b-4 border-blue-500 font-bold" : "text-gray-400"
            }`}
            onClick={() => setSelectedTab("forYou")}
          >
            For you
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

        <ZweezAdd/>

        <div className="p-4 text-center text-gray-500">
          {selectedTab === "forYou" && (<ZweezList sortMode="Time_Like_Ratio"/>)}
          {selectedTab === "follow" && (<ZweezList sortMode="Follow"/>)}
        </div>
      </main>
    </div>
  );
}

export default Home;
