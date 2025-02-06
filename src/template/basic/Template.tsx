import { JSX, ReactNode } from "react";

interface ITemplate {
    children: JSX.Element | ReactNode,
    bkgImage?: string,
    bkgColor?: string,
    align?: 'center' | 'top'
}

const Template = ({ children, bkgImage, bkgColor, align }: ITemplate) => {
    let inlineStyle = {};
    if (bkgColor) {
        inlineStyle = { backgroundColor: bkgColor };
    }
    if(bkgImage) {
        inlineStyle = { ...inlineStyle, backgroundImage: `url(${bkgImage})` };
    }
    return (
        <div className={`flex items-center justify-center min-h-screen bg-cover bg-center ${align === 'top'? 'bg-top' : ''}`} style={ inlineStyle }>
            { children }
        </div>
    );
};

export default Template;