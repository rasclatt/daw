import React, { useState } from 'react';
import UserLookupComponent from '../components/user-lookup';
import Template from '../template/basic/Template';
import guyBkg from '../media/images/guy.jpg';
import { UserProvider } from '../providers/user.provider';

/**
 * @description User page to demonstrate routing and context usage.
 */
const UserPage: React.FC = () => {
    const [ gender, setGender ] = useState<'female' | 'male' | ''>('');
    
    return (
        <Template
            align={ gender === 'female'? 'top' : 'center' }
            bkgImage={ guyBkg }
            bkgColor='#222'
            logo
            overlay
        >
            <UserProvider>
                <UserLookupComponent setGender={setGender} />
            </UserProvider>
        </Template>
    );
};

export default UserPage;