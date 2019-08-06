import React from 'react';
import styled from 'styled-components';

import websiteLogo from '../../../assets/images/logo.png';

/* STYLED COMPONENTS*/
const WebsiteLogo = styled.div`
  height: 3.5em;
    img {
      height: 100%;
    }
`;

const Logo = () => {
    return (
        <WebsiteLogo>
            <img src={websiteLogo} alt="Home"/>
        </WebsiteLogo>
    );
};

export default Logo;