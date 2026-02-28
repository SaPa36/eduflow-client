import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from "../Shared/Navbar";
import Footer from '../Shared/Footer';

const Main = () => {
    return (
        <div className='lg:max-w-screen-xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
            
        </div>
    );
};

export default Main;