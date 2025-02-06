import React, { useState } from 'react';
import { useUser } from '../providers/user.provider';
import UserLookupComponent from '../components/user-lookup';
import Template from '../template/basic/Template';
import guyBkg from '../media/images/guy.jpg';

/**
 * @description User page to demonstrate routing and context usage.
 */
const UserPage: React.FC = () => {
    const [ gender, setGender ] = useState<'female' | 'male' | ''>('');
    const { users } = useUser();

    return (
        <Template
            align={ gender === 'female'? 'top' : 'center' }
            bkgImage={ guyBkg }
            bkgColor='#222'
            logo
            overlay
            fullWidth={ users.length > 0 }
        >
            <UserLookupComponent setGender={ setGender } />
        </Template>
    );
};

export default UserPage;