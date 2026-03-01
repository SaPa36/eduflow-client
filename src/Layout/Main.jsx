import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from "../Shared/Navbar";
import Footer from '../Shared/Footer';

const Main = () => {
    const location = useLocation();

    const noHeaderFooter = ["/login", "/register"].includes(location.pathname);
    return (
        <div className='lg:max-w-screen-xl mx-auto'>
            {noHeaderFooter || <Navbar></Navbar>}
            <Outlet></Outlet>
            {noHeaderFooter || <Footer></Footer>}
            
        </div>
    );
};

export default Main;