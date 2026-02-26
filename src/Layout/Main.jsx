import React from 'react';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div className='lg:max-w-screen-xl mx-auto'>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;