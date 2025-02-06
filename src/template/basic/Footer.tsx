import React from 'react';
import { environment } from '../../environment';
import SendIcon from '@mui/icons-material/Send';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 text-white py-4">
            <div className="container mx-auto px-4 flex justify-between items-center">
                <p className="text-sm md:text-base lg:text-lg">
                    DAW Systems, Inc. &copy; {new Date().getFullYear()}. All Rights Reserved.
                </p>
                <div>

                <p className="text-sm md:text-base lg:text-lg">
                    Toll-Free: {environment.corpPhone}
                </p>
                <p className="text-sm md:text-base lg:text-lg">
                    <SendIcon fontSize='small'  /> <a href={`mailto:${environment.corpEmail}`} className="text-blue-400 cursor-pointer">{environment.corpEmail}</a>
                </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;