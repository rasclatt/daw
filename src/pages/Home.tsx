import React from 'react';
import bkgImage from '../media/images/pexels-nika-ronni.jpg';
import { NavLink } from 'react-router-dom';
import Template from '../template/basic/Template';

const HomePage: React.FC = () => {
    return (
        <Template bkgImage={bkgImage}>
            <div className='bg-white bg-opacity-75 p-8 rounded-lg backdrop-blur-sm text-center shadow-lg'>
                <h1 className='text-4xl font-bold text-gray-800 mb-3'>Looking for someone?</h1>
                <p>We all need a friend so let's look up some new friends.</p>
                <div className="flex items-center justify-center mt-4">
                    <NavLink to="/user-lookup" className="corporate cursor-pointer">Let's Go!</NavLink>
                </div>
            </div>
        </Template>
    );
};

export default HomePage;