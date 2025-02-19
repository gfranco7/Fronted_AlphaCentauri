import React, { useState } from 'react';
import {AsideMain } from './subComponents/asideMain';
import '../styles.css';
import { useUser } from '../UserContext';
import { Feed } from './subComponents/feed'



export const Home = () => {
    const {usuario} = useUser();
    console.log(usuario);
    return (
        <div className='text-3xl text-blue-100 flex flex-col h-screen'>
        <AsideMain usuario={usuario} />
        <Feed usuario={usuario} />
    </div>
    )
}