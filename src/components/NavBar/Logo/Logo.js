import React from 'react';
import {WebsiteLogo} from '../../../styles/shared';
import websiteLogo from '../../../assets/images/logo.svg';


const Logo = () => {
    return (
        <WebsiteLogo>
            <img src={websiteLogo} alt="Home"/>
        </WebsiteLogo>
    );
};

export default Logo;