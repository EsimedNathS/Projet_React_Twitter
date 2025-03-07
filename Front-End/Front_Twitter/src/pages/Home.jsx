import React, { useState } from "react";
import ZweezList from "../domains/zweezs/components.js/ZweezList";
import ZweezAdd from "../domains/zweezs/components.js/ZweezAdd";
import NavBar from "./components/NavBar";

function Home() {
  const [selectedTab, setSelectedTab] = useState("forYou");

  return (
    <div className="flex min-h-screen">
      <NavBar page="Home"/>

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
          <button
            className={`p-4 flex-1 text-lg ${
              selectedTab === "mostRecent" ? "border-b-4 border-blue-500 font-bold" : "text-gray-400"
            }`}
            onClick={() => setSelectedTab("mostRecent")}
          >
            Most Recent
          </button>
        </div>

        <ZweezAdd />

        <div className="p-4 text-center text-gray-500">
          {selectedTab === "forYou" && <ZweezList sortMode="Time_Like_Ratio" />}
          {selectedTab === "follow" && <ZweezList sortMode="Follow" />}
          {selectedTab === "mostRecent" && <ZweezList sortMode="Chronological" />}
        </div>
      </main>
    </div>
  );
}

export default Home;
