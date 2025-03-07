import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AuthGuard from "../../auth/AuthGuard";
import { getZweezListService, getZweezListUserService } from "../service";
import ZweezItem from "./ZweezItem";
import { getFollowService } from "../../users/service";

function ZweezList({ userId = null, sortMode }) {
  const user = useSelector((state) => state.user);
  
  const [zweezList, setZweezList] = useState([]);
  const [followData, setFollowData] = useState(null);

  // **1. Récupération des Zweezs**
  const fetchZweezs = async () => {
    try {
      let responseZweezList;
      if (userId === null) {
        responseZweezList = await getZweezListService();
      } else {
        responseZweezList = await getZweezListUserService(userId);
      }
      setZweezList(responseZweezList);
    } catch (error) {
      console.error("Erreur lors de la récupération des Zweez :", error);
    }
  };

  // **2. Récupération des follows si nécessaire**
  const fetchFollows = async () => {
    try {
      const followDataResponse = await getFollowService(user.id);
      setFollowData(followDataResponse);
    } catch (error) {
      console.error("Erreur lors de la récupération des follows :", error);
    }
  };

  // **3. useEffect pour charger les Zweezs et les follows**
  useEffect(() => {
    fetchZweezs();
    if (sortMode === "Follow") {
      fetchFollows();
    }
  }, [userId, sortMode]);

  // **4. Filtrage si mode "Follow"**
  let filteredZweezList = zweezList;
  if (sortMode === "Follow" && followData) {
    const followingIds = followData.followsData.map(follow => follow[0].id);
    filteredZweezList = zweezList.filter(zweez => followingIds.includes(zweez.userId));
  }

  // **5. Filtrage des trois derniers jours pour Time_Like_Ratio**
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  if (sortMode === "Time_Like_Ratio") {
    filteredZweezList = filteredZweezList.filter(zweez => new Date(zweez.time) >= threeDaysAgo);
  }

  // **6. Tri des Zweezs**
  const calculateLikeRatio = (zweez) => {
    const postTime = new Date(zweez.time);
    const minutesSincePost = (Date.now() - postTime) / 60000;
    return minutesSincePost > 0 ? zweez.likes.length / minutesSincePost : zweez.likes.length;
  };

  const sortedZweezList = [...filteredZweezList].sort((a, b) => {
    if (sortMode === "Chronological") {
      return new Date(b.time) - new Date(a.time);
    } else if (sortMode === "Time_Like_Ratio") {
      return calculateLikeRatio(b) - calculateLikeRatio(a);
    }
    return 0;
  });

  return (
    <div>
      {sortedZweezList.length === 0 && <p>Aucun zweez publié pour le moment</p>}
      {sortedZweezList.map((zweez) => (
        <ZweezItem key={zweez.id} zweez={zweez} onUpdate={fetchZweezs} />
      ))}
    </div>
  );
}

export default AuthGuard(ZweezList);
