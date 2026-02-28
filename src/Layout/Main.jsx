import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../Shared/Navbar";

const Main = () => {
    return (
        <div className='lg:max-w-screen-xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            
        </div>
    );
};

export default Main;