import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  text-align: center;
`;

const ButtonWrapper = styled.div`
  background-color: ${props => props.theme.darkColor};
  opacity: ${props => props.theme.translucent};
`;


const CentredButton = (props) => {

    //constant holding the button content
    const buttonContent = props.message;

    //variable holding the button content wrapped in a Link or a element
    let workingButton;

    if (props.link) {
        workingButton =
            <Link to={props.path}>
                <ButtonWrapper>
                    {props.message}
                </ButtonWrapper>
            </Link>;
    } else {
        workingButton =
            <a
                href={props.path}
                target="_blank"
                rel="noopener noreferrer">
                <ButtonWrapper>
                    {props.message}
                </ButtonWrapper>
            </a>;
    }

    return (
        <Wrapper>
            {workingButton}
        </Wrapper>
    );
};

export default CentredButton;