import React, { useState } from 'react';
import UserLookupComponent from '../components/user-lookup';
import Template from '../template/basic/Template';
// import girlBkg from '../media/images/lady.jpg';
// import guyBkg from '../media/images/guy.jpg';

const UserPage: React.FC = () => {
    const [ gender, setGender ] = useState<'female' | 'male' | ''>('');
    
    return (
        <Template
            align={ gender === 'female'? 'top' : 'center' }
            // bkgImage={ gender === 'female'? girlBkg : gender === 'male' ? guyBkg : undefined }
            bkgColor='#222'
        >
            <div className="main-content backdrop-blur-md flex justify-center items-center h-full w-full">
                <div className="content-wrapper max-w-screen-xl w-full p-5">
                    <UserLookupComponent setGender={setGender} />
                </div>
            </div>
        </Template>
    );
};

export default UserPage;