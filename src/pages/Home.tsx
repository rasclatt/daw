import React from 'react';
import bkgImage from '../media/images/pexels-nika-ronni.jpg';
import logoImage from '../media/images/logo.png';
import { NavLink } from 'react-router-dom';
import Template from '../template/basic/Template';

/**
 * @description Home page for the entry of the site.
 */

const HomePage: React.FC = () => {
    return (
        <Template bkgImage={bkgImage} align='top'>
            <div className='bg-white bg-opacity-75 p-8 rounded-lg text-center shadow-lg bkg-blur'>
                <div className="flex align-center justify-center h-full w-full mb-8">
                    <img src={logoImage} alt="logo" className='w-80'  />
                </div>
                <h1 className='text-4xl font-bold text-red-dark mb-3'>Looking for someone?</h1>
                <p>We all need a friend so let's look up some new friends.</p>
                <div className="flex items-center justify-center mt-4">
                    <NavLink to="/user-lookup" className="corporate cursor-pointer">Let's Go!</NavLink>
                </div>
            </div>
        </Template>
    );
};

export default HomePage;