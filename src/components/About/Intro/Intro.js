import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import styled from 'styled-components';
import posed from 'react-pose';
import {Waypoint} from "react-waypoint";

import * as actionTypes from "./../../../store/actions";
import {WEBSITE_TEXT, FADE_DURATION, AnimatedContent} from '../../../data/constants';

import authorsPhoto from '../../../assets/images/authorsPhoto.jpg'
import SectionHeading from './../../UI/SectionHeading/SectionHeading';
import CentredPhoto from './../../UI/CentredPhoto/CentredPhoto';
import SocialLinks from '../SocialLinks/SocialLinks';
import CentredButton from './../../UI/CentredButton/CentredButton';
import SectionLinks from '../SectionLinks/SectionLinks';
import SectionSeparator from './../../UI/SectionSeparator/SectionSeparator';

/* STYLED COMPONENTS */
const Body = styled.div`
  text-align: justify;
  font-size: ${props => props.theme.bodySize};
  font-family: ${props => props.theme.serif};
  line-height: 1.4em;
 
    a {
      font-family: ${props => props.theme.sansSerif};
    }
`;

const Separator = styled.div`
  margin: 2.8em auto 1.4em auto;
  height: 0.6em;
  width: 8em;
  background-color: ${props => props.theme.darkColor};
`;

/* POSE */
const AnimatedLinks = posed.div({
    visible: {
        opacity: 1,
        transform: 'scale(1,1)',
        transition: {
            type: 'spring',
            stiffness: 80
        }
    },
    hidden: {
        opacity: 0,
        transform: 'scale(0,0)'
    }
});

const AnimatedButton = posed.div({
    visible: {
        opacity: 1,
        transform: 'scale(1,1)',
        delay: 100,
        transition: {
            type: 'spring',
            stiffness: 100
        }
    },
    hidden: {
        opacity: 0,
        transform: 'scale(0,0)'
    }
});

const Intro = (props) => {

    //specifies whether social links and Patreon should be visible
    const [socialVisible, setSocialVisible] = useState(false);

    //shows the content
    const showContent = () => {
        props.onReloadChange(false);
    };

    //shows the social links and Patreon button
    const showSocial = () => {
        setSocialVisible(true);
    };

    //hides the social links and Patreon button
    const hideSocial = () => {
        setSocialVisible(false);
    };

    useEffect(() => {
        //show content after a while
        setTimeout(showContent, FADE_DURATION);

        //For larger screens, show social links after a while, irrespective of the viewport position
        if (window.innerWidth > 2000) {
            setTimeout(showSocial, 2000);
        }

    });

    //hide social links whenever the pathname changes
    useEffect(() => {
            setTimeout(hideSocial,100);
        },
        [props.location.pathname]
    );

    return (
        <React.Fragment>
            <AnimatedContent
                pose={!props.reload ? 'visible' : 'hidden'}>
                <SectionHeading
                    title={WEBSITE_TEXT.intro.title}
                    subtitle={WEBSITE_TEXT.intro.subtitle[props.lang]}
                />
                <Separator/>
                <CentredPhoto
                    source={authorsPhoto}
                    altText='Author’s photo'
                />
                <Body>
                    {WEBSITE_TEXT.intro.body[props.lang]}
                </Body>
            </AnimatedContent>
            <AnimatedLinks
                pose={socialVisible ? 'visible' : 'hidden'}>
                <SocialLinks/>
            </AnimatedLinks>
            <AnimatedButton
                pose={socialVisible ? 'visible' : 'hidden'}>
                <CentredButton
                    message={WEBSITE_TEXT.intro.patreon[props.lang].message}
                    path={WEBSITE_TEXT.intro.patreon[props.lang].path}
                />
            </AnimatedButton>
            <Waypoint
                onEnter={showSocial}
            />
            <AnimatedContent
                pose={!props.reload ? 'visible' : 'hidden'}>
                <SectionLinks
                    lang={props.lang}
                    top={false}
                    nocturine={true}
                    pubs={true}
                    read={true}
                />
                <SectionSeparator/>
            </AnimatedContent>
            <Waypoint
                onEnter={showSocial}
            />
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        lang: state.language,
        reload: state.pageReload
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onReloadChange: (newState) => dispatch({
            type: actionTypes.SET_PAGE_RELOAD,
            pageReload: newState
        })
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Intro));