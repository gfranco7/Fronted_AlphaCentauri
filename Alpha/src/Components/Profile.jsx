import React, { useState } from 'react';
import {AsideMain } from './subComponents/asideMain';
import { useUser } from '../UserContext';
import { ProfileBanner } from './profile/ProfileBanner'
import { ProfilePosts } from './profile/ProfilePosts'



export const Profile = () => {

  const { usuario } = useUser();

  return (
<div className='flex flex-col h-screen'>
        <AsideMain usuario={usuario} />
        <div className=' w-full h-full overflow-y-auto'
            style={{ 
              backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/006/748/722/large_2x/planet-earth-on-space-background-elements-of-this-image-furnished-by-nasa-free-photo.jpg')`,
              backgroundSize: 'cover', // Ajusta la imagen para cubrir todo el fondo
              backgroundPosition: 'center', // Centra la imagen en el fondo
              backgroundRepeat: 'no-repeat' // Evita que la imagen se repita
            }}
          >
          <ProfileBanner usuario={usuario} />
          <ProfilePosts usuario={usuario} />
          </div>
        </div>
  )
}
