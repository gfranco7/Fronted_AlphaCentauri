import React, { useState } from "react";
import { FriendsCard } from "./FriendsCard";

export const FriendsFeed = ({ usuario }) => {
  const [activeTab, setActiveTab] = useState("following"); // Estado para manejar la pestaña activa
  const followingIds = usuario.followingIds || [];
  const followerIds = usuario.followersIds || []; // Asumiendo que tienes un array de seguidores en el usuario

  return (
    <div className=" p-5 md:p-10 h-full overflow-y-scroll bg-gray-900"
    style={{ 
      backgroundImage: `url('https://npr.brightspotcdn.com/d1/9a/ab00ad554deb8d5b63c889676ab5/adobestock-394945439.jpeg')`,
      backgroundSize: 'cover', // Ajusta la imagen para cubrir todo el fondo
      backgroundPosition: 'center', // Centra la imagen en el fondo
      backgroundRepeat: 'no-repeat' // Evita que la imagen se repita
  }}>
      {/* Pestañas */}
      <div className="flex justify-center mb-5">
        <button
          className={`px-4 py-2 mx-2 ${
            activeTab === "following" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
          } rounded-lg`}
          onClick={() => setActiveTab("following")}
        >
          Following
        </button>
        <button
          className={`px-4 py-2 mx-2 ${
            activeTab === "followers" ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
          } rounded-lg`}
          onClick={() => setActiveTab("followers")}
        >
          Followers
        </button>
      </div>

      {/* Contenido de las pestañas */}
      <div className="flex justify-start lg:flex-col lg:p-10">
        {activeTab === "following" ? (
          followingIds.length === 0 ? (
            <p className="text-white text-center">No estás siguiendo a nadie.</p>
          ) : (
            followingIds.map((followingId) => (
              <FriendsCard key={followingId} usuario={{ id: followingId }} />
            ))
          )
        ) : (
          followerIds.length === 0 ? (
            <p className="text-white text-center">No tienes seguidores.</p>
          ) : (
            followerIds.map((followerId) => (
              <FriendsCard key={followerId} usuario={{ id: followerId }} />
            ))
          )
        )}
      </div>
    </div>
  );
};