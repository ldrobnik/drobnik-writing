import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {connect} from 'react-redux';

import Intro from './Intro/Intro';
import Nocturine from './Nocturine/Nocturine';
import Pubs from './Pubs/Pubs';
import Read from './Read/Read';
import CopyrightNote from '../../UI/CopyrightNote/CopyrightNote';
import * as actionTypes from "../../../store/actions";
import {TEXT_NAMES} from '../../../data/constants';


const TopAnchor = styled.div`
  position: absolute;
  top: 0;
`;

const Wrapper = styled.div`

    z-index: 10;
    
    @media all and (min-width: ${props => props.theme.extraSmallScr}) {
      padding: 7em 3em 2em 3em;
    }
    
    @media all and (min-width: ${props => props.theme.smallScr}) {
      padding: 7em 5% 2em 5%;
    }
    
    @media all and (min-width: ${props => props.theme.mediumScr}) {
      padding: 7em 20% 2em 20%;
    }
    
    @media all and (min-width: ${props => props.theme.largeScr}) {
      padding: 7em 22% 2em 22%;
    }
    
    @media all and (min-width: ${props => props.theme.extraLargeScr}) {
      padding: 7em 25% 2em 25%;
    }
    
    padding: 7em 1em 2em 1em;
    
`;

const SectionWrapper = styled.div`
    margin-bottom: 5em;
`;

const About = (props) => {


    //part of page title to be displayed depending on the current language
    const fictionWriter = (props.lang === 'en') ? 'fiction writer' : 'prozaik';


    //updates current theme
    const updateTheme = () => {
        //randomly selected theme
        const randomTheme = TEXT_NAMES[Math.floor(Math.random() * TEXT_NAMES.length)];

        //theme to be used - black-and-white if the black-and-white mode is on or the randomly selected theme
        const themeToUse = props.bwMode ? 'blackAndWhite' : randomTheme;
        props.onThemeChange(themeToUse);
    };

    //shows the NavBar
    const showNavbar = () => {
        props.onSetNavbar(true);
    };

    useEffect(() => {
        //Update page title with the piece title
        document.title = `Łukasz Drobnik - ${fictionWriter}`;

        //change theme to a random one
        updateTheme();

        //show Navbar
        showNavbar();
    });


    return (
        <Wrapper>

            <TopAnchor>
                <div id='top'></div>
            </TopAnchor>
            <SectionWrapper>
                <Intro/>
            </SectionWrapper>
            <SectionWrapper id='nocturine'>
                <Nocturine/>
            </SectionWrapper>
            <SectionWrapper id='pubs'>
                <Pubs/>
            </SectionWrapper>
            <SectionWrapper id='read'>
                <Read/>
            </SectionWrapper>
            <CopyrightNote />
        </Wrapper>
    );
};

const mapStateToProps = state => {
    return {
        lang: state.language,
        bwMode: state.blackAndWhite
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onThemeChange: (newTheme) => dispatch({type: actionTypes.SET_THEME, theme: newTheme}),
        onSetNavbar: (newState) => dispatch({type: actionTypes.SET_NAVBAR_VISIBILITY, navbarVisible: newState})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(About);