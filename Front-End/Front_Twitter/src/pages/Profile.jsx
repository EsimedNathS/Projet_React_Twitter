import React, { useState } from "react";
import imageZB from '../assets/Logo_Z_B.png'; // Assurez-vous que l'image est au bon emplacement
import { useNavigate } from "react-router";
import { FaHome, FaBell, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

function Profile() {
  const [activeTab, setActiveTab] = useState("tweets");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      {console.log(user)}
      <aside className="w-1/4 bg-black text-white p-6 flex flex-col gap-6 items-center">
        <img 
          src={imageZB}
          alt="Logo"
          className="w-12 h-12 object-cover mb-6"
        />

        <button className="flex items-center gap-3 text-lg hover:text-gray-400 w-full justify-start px-4" onClick={() => navigate("/home")}>
          <FaHome size={20} />
          <span>Home</span>
        </button>

        <button className="flex items-center gap-3 text-lg hover:text-gray-400 w-full justify-start px-4">
          <FaBell size={20} />
          <span>Notification</span>
        </button>

        <button className="flex items-center gap-3 text-lg hover:text-gray-400 w-full justify-start px-4">
          <FaUser size={20} />
          <span>Profile</span>
        </button>
      </aside>

      {/* Main content */}
      <div className="w-3/4 p-8">
        {/* Header */}
        <div className="flex flex-col items-start gap-3 mb-6">
          <h1 className="text-4xl font-bold">Username</h1>
          <p className="text-xl text-gray-500">@username</p>
          <button className="bg-blue-500 text-white py-2 px-6 rounded-full mt-2 hover:bg-blue-400">
            Edit Profile
          </button>
        </div>

        {/* Tabs (Tweets, Following, Followers, etc.) */}
        <div className="flex gap-6 mb-8">
          <button 
            className={`text-lg ${activeTab === 'zweezs' ? 'border-b-2 border-blue-500' : ''} hover:text-gray-600`}
            onClick={() => setActiveTab("zweezs")}
          >
            Zweezs
          </button>
          <button 
            className={`text-lg ${activeTab === 'following' ? 'border-b-2 border-blue-500' : ''} hover:text-gray-600`}
            onClick={() => setActiveTab("following")}
          >
            Following
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "tweets" && (
          <div>
            <p className="text-xl font-semibold mb-4">Zweezs</p>
            {/* Example tweet */}
            <div className="bg-white p-4 rounded-xl shadow mb-4">
              <p className="text-gray-800">This is a sample zweez.</p>
              <p className="text-sm text-gray-500 mt-2">2m ago</p>
            </div>
            {/* Add more tweets here */}
          </div>
        )}

        {activeTab === "following" && (
          <div>
            <p className="text-xl font-semibold mb-4">Following</p>
            {/* List of people the user is following */}
            <div className="bg-white p-4 rounded-xl shadow mb-4">
              <p className="text-gray-800">Followed User 1</p>
            </div>
            {/* Add more following here */}
          </div>
        )}

        {activeTab === "followers" && (
          <div>
            <p className="text-xl font-semibold mb-4">Followers</p>
            {/* List of followers */}
            <div className="bg-white p-4 rounded-xl shadow mb-4">
              <p className="text-gray-800">Follower User 1</p>
            </div>
            {/* Add more followers here */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
