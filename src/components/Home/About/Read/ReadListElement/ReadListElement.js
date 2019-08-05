import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from "react-router-dom";
import {TEXTS, WEBSITE_TEXT, POP_KEYFRAMES} from "../../../../../data/constants";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    animation: ${POP_KEYFRAMES} ${props => props.theme.popAnimation};
  }
`;

const ElementContent = styled.div`
  text-align: center;
  font-weight: bold;

  user-select: none;
  margin: 1em 0;
`;

const Title = styled.div`
    font-size: ${props => props.theme.subtitleSize}
      text-transform: uppercase;
`;

const Subtitle = styled.div`
    font-size: ${props => props.theme.smallCaptionSize}
`;

const Line = styled.div`
  height: 0.8em;
  width: 10em;
  margin: 1em;
  background-color: ${props => props.theme.darkColor};
`;

const ReadListElement = (props) => {


    return (

        <Link
            to={props.path}>
            <Wrapper>
                <Line/>
                <ElementContent>
                    <Title>
                        {props.title}
                    </Title>
                    <Subtitle>
                        {props.subtitle}
                    </Subtitle>
                </ElementContent>
                <Line/>
            </Wrapper>
        </Link>


    );
};

export default ReadListElement;