import React, { useState } from "react";
import { useNavigate } from "react-router";
import { CreateModal } from "../subComponents/createModal";
import { ProfilePhotoUpdate } from "./ProfilePhotoUpdate";
import { useUser } from "../../UserContext";
import { LogOutButton } from './LogOutIcon'
import { ProfileEditForm } from "./ProfileEditForm";


export const ProfileBanner = () => {
  const navigate = useNavigate();
  const { usuario } = useUser();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    

  if (!usuario) return null; 

  const handleOpenModal = () => setIsCreateModalOpen(true);
  const handleCloseModal = () => setIsCreateModalOpen(false);

  const handleNoti = () => {
    setIsNotificationOpen(true);
  };

  const handleNotiClose = () => {
    setIsNotificationOpen(false);
  };

  return (
    <div className="w-full text-white flex flex-col items-center relative min-h-screen ">
    <div
      className="w-full h-30 bg-black absolute bg-cover bg-center z-0"
      style={{ 
        backgroundImage: `url(${usuario.banner})`,
      }}
    ></div>
  
    <div className="w-full flex flex-col items-center relative z-10 pt-20">
      <div
        className="w-full h-48 sm:h-40 md:h-44 lg:h-48 bg-cover bg-center rounded-t-2xl"
        style={{ backgroundImage: `url(${usuario.banner})` }}
      ></div>
  
      <div className="absolute right-6 top-6">
        <LogOutButton />
      </div>
  
      <div className="w-full text-white max-w-4xl bg-transparent backdrop-blur-2xl rounded-2xl shadow-xl -mt-20 p-8 flex flex-col items-center border border-white border-opacity-20">
        <ProfilePhotoUpdate />
  
        <div className="text-center mt-6">
          <h3 className="text-3xl font-bold text-white">
            {usuario.name} {usuario.lastname}
          </h3>
          <p className="text-gray-600 text-lg mt-1">@{usuario.username}</p>
        </div>
  
        <div className="flex justify-around w-full max-w-md mt-8 text-center">
          <div className="flex flex-col text-gray-700">
            <span className="text-2xl font-semibold text-purple-600">
              {usuario.publications.length}
            </span>
            <span className="text-sm text-white">Posts</span>
          </div>
          <div className="flex flex-col text-gray-700">
            <span className="text-2xl font-semibold text-blue-600">
              {usuario.followersIds.length}
            </span>
            <span className="text-sm text-white">Followers</span>
          </div>
          <div className="flex flex-col text-gray-700">
            <span className="text-2xl font-semibold text-green-600">
              {usuario.followingIds.length}
            </span>
            <span className="text-sm text-white">Following</span>
          </div>
        </div>
  
        <p className="text-white text-sm text-center mt-6 max-w-2xl leading-relaxed">
          {usuario.bio || "Hola mundo."}
        </p>
  
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleNoti}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-2 px-8 rounded-full hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Edit Profile
          </button>
          <button
            onClick={handleOpenModal}
            className="bg-gradient-to-r from-green-500 to-teal-500 text-white py-2 px-8 rounded-full hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Add Post
          </button>
        </div>
      </div>
    </div>
  
    {isCreateModalOpen && (
      <CreateModal onClose={handleCloseModal} usuario={usuario} />
    )}
    {isNotificationOpen && (
      <ProfileEditForm usuario={usuario} onClose={handleNotiClose} />
    )}
  </div>
  );
};
