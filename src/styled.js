/* STYLED-COMPONENTS */
import styled, {createGlobalStyle} from 'styled-components';
import {POP_KEYFRAMES, PULSATE_KEYFRAMES} from './data/constants';

/* General */

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: ${props => props.theme.sansSerif};
    color: ${props => props.theme.darkColor};
    background: linear-gradient(145deg, ${props => props.theme.color1}, ${props => props.theme.color2});
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.darkColor};

  }

  ::selection {
    color: ${props => props.theme.color1};
    background-color: ${props => props.theme.darkColor};
  }
`;

/* About.js */

export const AboutTopAnchor = styled.div`
  position: absolute;
  top: 0;
`;

export const AboutWrapper = styled.div`
  overflow: hidden;
  padding: 7em 1em 2em 1em;

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

  .hidden {
    display: none;
  }

`;

export const AboutSectionWrapper = styled.div`
  margin-bottom: 5em;
`;

/* Book.js */

export const BookBody = styled.div`
  font-size: ${props => props.theme.bodySize};
  font-family: ${props => props.theme.serif};
  line-height: 1.4em;
  margin-top: 2em;
  margin-bottom: 2.5em;

  @media all and (min-width: ${props => props.theme.smallScr}) {
    text-align: justify;
  }

`;

export const BookSlogan = styled.div`
  font-size: ${props => props.theme.bodySize};
  font-family: ${props => props.theme.sansSerif};
  line-height: 1.4em;
  text-align: center;
  text-transform: uppercase;
  margin: 1.5em 0 2em 0;

  a {
    @media all and (min-width: ${props => props.theme.smallScr}) {
      &:hover {
        animation: ${PULSATE_KEYFRAMES} ${props => props.theme.pulsateAnimation};
      }
    }
  }
`;

/* Intro.js */

export const IntroBody = styled.div`
  font-size: ${props => props.theme.bodySize};
  font-family: ${props => props.theme.serif};
  line-height: 1.4em;

  @media all and (min-width: ${props => props.theme.smallScr}) {
    text-align: justify;
  }

  a {
    font-family: ${props => props.theme.sansSerif};

    @media all and (min-width: ${props => props.theme.smallScr}) {
      &:hover {
        animation: ${PULSATE_KEYFRAMES} ${props => props.theme.pulsateAnimation};
      }
    }

  }

  .centered {
    text-align: center;
  }
`;

/* Pubs.js */

export const PubsWrapper = styled.div`
  text-align: center;
`;

export const PubsMessage = styled.div`
  font-size: ${props => props.theme.bodySize};
  font-weight: bold;
  margin: 2em 0 0.5em 0;
`;

export const PubsSwitchPanel = styled.div`
  display: flex;
  justify-content: center;
  align-content: space-evenly;
  font-size: ${props => props.theme.bodySize};
  font-weight: bold;
  margin-bottom: 2em;
`;

export const PubsSwitchWrapper = styled.div`
  display: flex;
  margin: 0.5em;
`;

export const PubsLabel = styled.span`
  padding: 0.1em;
`;

export const PubsSubsectionHeading = styled.h1`
  font-size: ${props => props.theme.subtitleSize};
  //margin-top: 1em;
  text-transform: uppercase;
`;

export const PubsSeparator = styled.div`
  margin: 2em auto 0 auto;
  height: 0.6em;
  width: 6em;
  background-color: ${props => props.theme.darkColor};
`;

/* PubList.js */

export const PubTileContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-content: space-evenly;
  flex-wrap: wrap;
  width: 100%;
  cursor: pointer;
`;

/* PubTitle.js */

export const PublicationTile = styled.div`
  background-color: ${props => props.theme.background};
  position: relative;
  height: 12em;
  width: 15em;
  padding: 0.2em 0.5em;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  overflow: hidden;
`;

export const PubBookTile = styled.div`
  background-color: ${props => props.theme.background};
  position: relative;
  height: 17em;
  width: 19em;
  padding: 0.2em 0.5em;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  overflow: hidden;
`;

export const PubTileWrapper = styled.div`
  display: table;
  margin: 0.8em 0;

  &:hover {
    animation: ${POP_KEYFRAMES} ${props => props.theme.popAnimation};
  }
`;

export const PubYear = styled.div`
  font-size: ${props => props.theme.captionSize};
  margin-bottom: 0.5em;
`;

export const PubTitle = styled.div`
  font-size: ${props => props.theme.bodySize};
  text-transform: uppercase;
  font-weight: bold;
`;

export const PubSeparator = styled.div`
  margin: 0.5em auto;
  height: 0.5em;
  width: 8em;
  background-color: ${props => props.theme.darkColor};
`;

export const PubIssue = styled.div`
  font-size: ${props => props.theme.smallCaptionSize};
  margin-bottom: 0.5em;
`;

export const PubDescription = styled.div`
  font-size: ${props => props.theme.smallCaptionSize};
`;

/* BookCover.js */

export const BookCoverWrapper = styled.div`
  text-align: center;
  padding: 0.5em;
  position: relative;
`;

export const BookCoverPhoto = styled.div`
  height: 5em;
  opacity: ${props => props.theme.slightlyTranslucent};
  z-index: 60;

  img {
    height: 100%;
  }
`;

/* QuoteList.js */

export const QuoteListWrapper = styled.div`
  text-align: center;
`;


/* Read.js */

export const ReadWrapper = styled.div`
  text-align: center;
`;

export const ReadMessage = styled.div`
  font-weight: bold;
  font-size: ${props => props.theme.bodySize};
  margin: 3em 0;
`;

/* ReadListElement.js */

export const ReadListElementWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    animation: ${POP_KEYFRAMES} ${props => props.theme.popAnimation};
  }
`;

export const ReadListElementContent = styled.div`
  text-align: center;
  font-weight: bold;

  user-select: none;
  margin: 1em 0;
`;

export const ReadListElementTitle = styled.div`
  font-size: ${props => props.theme.subtitleSize}
  text-transform: uppercase;
`;

export const ReadListElementSubtitle = styled.div`
  font-size: ${props => props.theme.smallCaptionSize}
`;

export const ReadListElementLine = styled.div`
  height: 0.8em;
  width: 10em;
  margin: 1em;
  background-color: ${props => props.theme.darkColor};
`;

/* SectionLinks.js */

export const SectionLinksWrapper = styled.div`
  display: flex;
  justify-content: center;
  font-weight: bold;
  font-size: ${props => props.theme.captionSize}
  margin: 4em 0;
  text-decoration: underline;

  div {
    padding: 0 0.3em;

    @media all and (min-width: ${props => props.theme.smallScr}) {
      &:hover {
        animation: ${PULSATE_KEYFRAMES} ${props => props.theme.pulsateAnimation};
      }
    }
  }
`;

/* SocialLinks.js */

export const SocialLinksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  font-size: ${props => props.theme.bodySize};
  margin: 1.5em 0;

  div {
    padding: 8px;
  }

  @media all and (min-width: ${props => props.theme.smallScr}) {
    a:hover {
      animation: ${PULSATE_KEYFRAMES} ${props => props.theme.pulsateAnimation};
    }
  }
`;

/* BookPage.js */

export const BookPageTopAnchor = styled.div`
  position: absolute;
  top: 0;
`;

export const BookPageWrapper = styled.div`
  overflow: hidden;
  padding: 7em 1em 2em 1em;

  .centered {
    text-align: center;
  }

  @media all and (min-width: ${props => props.theme.extraSmallScr}) {
    padding: 7em 3em 2em 3em;
  }

  @media all and (min-width: ${props => props.theme.smallScr}) {
    padding: 7em 10% 2em 10%;
  }

  @media all and (min-width: ${props => props.theme.mediumScr}) {
    padding: 7em 20% 2em 20%;
  }

  @media all and (min-width: ${props => props.theme.largeScr}) {
    padding: 7em 25% 2em 25%;
  }

  @media all and (min-width: ${props => props.theme.extraLargeScr}) {
    padding: 7em 32% 2em 32%;
  }
`;

/* NavBar.js */

export const NavBarWrapper = styled.div`
  .hidden {
    display: none;
  }
`;

export const NavToolbar = styled.header`
  height: 3em;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  box-sizing: border-box;
  background-color: ${props => props.theme.background};
  z-index: 50;
  font-weight: bold;
  user-select: none;
  backdrop-filter: blur(8px);
`;

export const LogoWrapper = styled.div`
  position: absolute;
  top: -4px;
  left: -2px;

  @media all and (min-width: ${props => props.theme.smallScr}) {
    &:hover {
      animation: ${PULSATE_KEYFRAMES} ${props => props.theme.pulsateAnimation};
    }
  }
`;

export const NavElement = styled.div`
  cursor: pointer;
  margin: ${props => props.theme.navIconMargin};

  @media all and (min-width: ${props => props.theme.smallScr}) {
    &:hover {
      animation: ${PULSATE_KEYFRAMES} ${props => props.theme.pulsateAnimation};
    }
  }
`;

export const ToggledNavElement = styled.div`
  cursor: pointer;
  margin: ${props => props.theme.navIconMargin};
  opacity: ${props => props.theme.translucent};

  @media all and (min-width: ${props => props.theme.smallScr}) {
    &:hover {
      animation: ${PULSATE_KEYFRAMES} ${props => props.theme.pulsateAnimation};
    }
  }
`;

export const NavLinkContent = styled.div`
  padding: ${props => props.theme.navIconPadding};
  display: block;
  min-width: 1.5em;
`;

/* Logo.js */

export const WebsiteLogo = styled.div`
  height: 2.8em;
  padding: 0.3em;

  img {
    height: 100%;
  }
`;

/* NavLinks.js */

export const NavLinksWrapper = styled.div`
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

/* QuickLinks.js */

export const QuickLinksWrapper = styled.div`
   padding: 1em 1em;
   
   @media all and (min-width: ${props => props.theme.extraSmallScr}) {
      padding: 1em 3em;
   }
    
   @media all and (min-width: ${props => props.theme.smallScr}) {
      padding: 1em 5%;
   }
    
   @media all and (min-width: ${props => props.theme.mediumScr}) {
      padding: 1em 10%;
   }
    
   @media all and (min-width: ${props => props.theme.largeScr}) {
      padding: 1em 12%;
   }
    
   @media all and (min-width: ${props => props.theme.extraLargeScr}) {
      padding: 1em 15%;
   }
`;

/* Text.js */

export const TextTopAnchor = styled.div`
  position: absolute;
  top: 0;
`;

export const TextWrapper = styled.div`
  overflow: hidden;
  padding: 7em 1em 2em 1em;

  .centered {
    text-align: center;
  }

  @media all and (min-width: ${props => props.theme.extraSmallScr}) {
    padding: 7em 3em 2em 3em;
  }

  @media all and (min-width: ${props => props.theme.smallScr}) {
    padding: 7em 10% 2em 10%;
  }

  @media all and (min-width: ${props => props.theme.mediumScr}) {
    padding: 7em 20% 2em 20%;
  }

  @media all and (min-width: ${props => props.theme.largeScr}) {
    padding: 7em 25% 2em 25%;
  }

  @media all and (min-width: ${props => props.theme.extraLargeScr}) {
    padding: 7em 32% 2em 32%;
  }
`;

export const TextHeader = styled.div`
  text-align: center;

  @media all and (min-width: ${props => props.theme.mediumScr}) {
    padding-right: 1em;
  }
`;

export const TextTitle = styled.div`
  font-size: ${props => props.theme.titleSize};
  font-weight: bold;

  @media all and (max-width: ${props => props.theme.smallScr}) {
    font-size: 15vw;
  }
`;

export const TextSubtitle = styled.div`
  font-size: ${props => props.theme.subtitleSize};
  font-weight: bold;
  font-style: italic;

  @media all and (max-width: ${props => props.theme.smallScr}) {
    font-size: 8vw;
  }
`;

export const TextBody = styled.div`
  font-family: ${props => props.theme.serif};
  font-size: ${props => props.theme.bodySize};
  line-height: 1.4em;
  position: relative;
  margin-top: 2em;
`;

/* Credits.js */

export const CreditWrapper = styled.div`
  font-size: ${props => props.theme.captionSize};
  font-family: ${props => props.theme.serif};
  margin: 2em 0 2.5em 0;
`;

/* DescriptionPanel.js */

export const Description = styled.div`
  background-color: ${props => props.theme.background};
  font-size: ${props => props.theme.bodySize};
  text-align: center;
  padding: 0.5em 1em;
  margin: 2.5em 0;
  
  a {
    font-weight: bold;
    
    @media all and (min-width: ${props => props.theme.smallScr}) {
             &:hover {
                      animation: ${PULSATE_KEYFRAMES} ${props => props.theme.pulsateAnimation};
             }
        }  
  }
`;

/* NextTextLink.js */

export const NextTextWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    animation: ${POP_KEYFRAMES} ${props => props.theme.popAnimation};
  }
`;

export const UpNext = styled.div`
  text-align: center;
  font-weight: bold;
  font-size: ${props => props.theme.bodySize}
  user-select: none;
  margin: 1em 0;
`;

export const NextTextLine = styled.div`
  height: 0.5em;
  width: 6em;
  margin: 1em;
  background-color: ${props => props.theme.darkColor};
`;

/* CentredButton.js */

export const CentredButtonOuterWrapper = styled.div`
  text-align: center;
  margin: 1em 0;
`;

export const CentredButtonButtonWrapper = styled.div`
  background-color: ${props => props.theme.background};
  font-size: ${props => props.theme.bodySize};
  font-weight: bold;
  padding: 0.8em;
  margin: 0 0.5em;
  cursor: pointer;
  display: block;
  position: relative;
  user-select: none;
  overflow: hidden;
        
  &:hover {
      animation: ${POP_KEYFRAMES} ${props => props.theme.popAnimation}
  }
    
  @media all and (min-width: ${props => props.theme.extraSmallScr}) {
       margin: 0 0.8em;;
  }
    
  @media all and (min-width: ${props => props.theme.smallScr}) {
       margin: 0 4em;
  }
    
  @media all and (min-width: ${props => props.theme.mediumScr}) {
      margin: 0 2em;
  }
   
  @media all and (min-width: ${props => props.theme.largeScr}) {
       margin: 0 20%;
  }
    
  @media all and (min-width: ${props => props.theme.extraLargeScr}) {
       margin: 0 25%;
  }  
`;

/* CentredPhoto.js */

export const CentredPhotoWrapper = styled.div`
  text-align: center;
  padding: 2em;
  position: relative; 
`;

export const Photo = styled.div`
  height: 12em;
  opacity: ${props => props.theme.slightlyTranslucent};
  z-index: 60;
  
  img {
      height: 100%;
  }
`;

export const PhotoLink = styled.div`
  height: 24em;
  opacity: ${props => props.theme.slightlyTranslucent};
  z-index: 60;
  
  img {
      height: 100%;
  }
`;

/* CopyrightNote.js */

export const Note = styled.div`
  margin: 1em 0;
  font-size: ${props => props.theme.smallCaptionSize};
  text-align: center;
`;

/* DataNotice.js */

export const Notice = styled.div`
  background-color: ${props => props.theme.darkColor};
  padding: 1em 0;
  margin: 0 auto;
  position: fixed;
  bottom: 10px;
  left: 5%;
  width: 90%;
  text-align: center;
  

  @media all and (min-width: ${props => props.theme.mediumScr}) {
       left: 10%;
       width: 80%;
  }
    
  @media all and (min-width: ${props => props.theme.largeScr}) {
       left: 15%;
       width: 70%;
  }
    
  @media all and (min-width: ${props => props.theme.extraLargeScr}) {
       left: 20%;
       width: 60%;
  }
`;

export const NoticeMessage = styled.div`
    color: ${props => props.theme.lightColor};
    font-size: ${props => props.theme.captionSize};
    font-family: ${props => props.theme.serif};
    padding: 0.5em 1em;
`;

export const NoticeDismissButton = styled.div`
    background-color: ${props => props.theme.lightColor};
    text-transform: uppercase;
    font-weight: bold;
    max-width: 8em;
    margin: 0 auto;
    padding: 0.3em;
    cursor: pointer;
    
    &:hover {
      opacity: ${props => props.theme.slightlyTranslucent};
    }
`;

/* InvisibleSeparator.js */

export const InvSeparator = styled.div`
  height: 3em;
`;

/* SectionHeading.js */

export const SectionHeader = styled.div`
  text-align: center;
`;

export const SectionTitle = styled.div`
    font-size: ${props => props.theme.titleSize};
    font-weight: bold;
    
    @media all and (max-width: ${props => props.theme.smallScr}) {
      font-size: 12vw;
    }
`;

export const SectionSubtitle = styled.div`
    font-size: ${props => props.theme.subtitleSize};
    font-weight: bold;
    font-style: italic;
    
    @media all and (max-width: ${props => props.theme.smallScr}) {
      font-size: 6vw;
    }
    
`

/* SectionSeparator.js */

export const SectSeparator = styled.div`
  margin: 6em auto 3em auto;
  height: 0.8em;
  width: 15em;
  background-color: ${props => props.theme.darkColor};
`;

/* SmallSeparator.js */

export const SmSeparator = styled.div`
  margin: 2.8em auto 1.4em auto;
  height: 0.6em;
  width: 8em;
  background-color: ${props => props.theme.darkColor};
`;