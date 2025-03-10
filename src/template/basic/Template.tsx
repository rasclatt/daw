import { JSX, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import logoImage from '../../media/images/logo.png';
import logoImageWht from '../../media/images/logo-white.png';
import Footer from "./Footer";

interface ITemplate {
    children: JSX.Element | ReactNode,
    bkgImage?: string,
    bkgColor?: string,
    align?: 'center' | 'top',
    logo?: boolean,
    overlay?: boolean,
    fullWidth?: boolean
}
/**
 * @description Basic template for the application. Naming the file as Template allows
 *              for other templates to be created and used at some point, if needed. 
 */
const Template = ({ children, bkgImage, bkgColor, align, logo, overlay, fullWidth }: ITemplate) => {
    let inlineStyle = {};
    if (bkgColor) {
        inlineStyle = { backgroundColor: bkgColor };
    }
    if(bkgImage) {
        inlineStyle = { ...inlineStyle, backgroundImage: `url(${bkgImage})` };
    }
    return (
        <>
        <div className={`flex items-center justify-center min-h-screen bg-cover bg-center ${align === 'top'? 'bg-top' : ''}`} style={ inlineStyle }>
            <div className="main-content backdrop-blur-md flex justify-center items-center h-full w-full z-10 relative">
                <div className={ `content-wrapper max-w-screen-xl p-5 ${fullWidth? 'w-full' : ''}` }>
                    {/* Allow for a contained logo */}
                    { logo && (
                        <div className="flex align-center justify-center h-full w-full mb-8">
                            <NavLink to="/"><img src={ overlay? logoImageWht : logoImage } alt="logo" className='w-80'  /></NavLink>
                        </div>
                    )}
                    { children }
                </div>
            </div>
            { overlay && <div className="fixed inset-0 bg-black bg-opacity-50"></div> }
        </div>
        <Footer />
        </>
    );
};

export default Template;