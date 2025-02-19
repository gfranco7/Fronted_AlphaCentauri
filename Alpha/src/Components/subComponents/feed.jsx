import React from 'react'
import { FeedPosts } from './feedPosts'

export const Feed = ({usuario}) => {
  return (
    <>
    <main className='flex flex-col w-full h-full overflow-y-auto'
    style={{ 
      backgroundImage: `url('../../Imgs/61691.png')`,
      backgroundSize: 'cover', // Ajusta la imagen para cubrir todo el fondo
      backgroundPosition: 'center', // Centra la imagen en el fondo
      backgroundRepeat: 'no-repeat' // Evita que la imagen se repita
  }}>
        <FeedPosts usuario={usuario} />
    </main>
    </>
  )
}