import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import {WEBSITE_TEXT, PULSATE_KEYFRAMES, AnimatedContent} from "./../../../data/constants";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: ${props => props.theme.captionSize}
  margin: 0 auto;
  transform: translateX(6vw);
  
  div {
    padding: 0 0.3em;
    
    @media all and (min-width: ${props => props.theme.smallScr}) {
             &:hover {
                      animation: ${PULSATE_KEYFRAMES} ${props => props.theme.pulsateAnimation};
             }
        }  
  }
`;

const NavLinks = (props) => {

    //array containing all section link data
    const sectionLinks = WEBSITE_TEXT.sectionLinks;

    return (

        <Wrapper>

            {sectionLinks.map((link, k) => {
                    return (
                        <AnimatedContent
                            key={k}
                            pose={!props.reload ? 'visible' : 'hidden'}>
                            <div>
                                <AnchorLink href={`#${sectionLinks[k].id}`}
                                            offset="60px">{sectionLinks[k].text[props.lang]}</AnchorLink>
                            </div>
                        </AnimatedContent>
                    );
                }
            )}
        </Wrapper>

    );
};

const mapStateToProps = state => {
    return {
        lang: state.language,
        reload: state.pageReload
    };
};

export default connect(mapStateToProps)(NavLinks);