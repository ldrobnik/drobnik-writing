import React, { lazy, Suspense, useState, useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Markdown from "markdown-to-jsx/dist/index.js";
import { Waypoint } from "react-waypoint";
import {
  setTheme,
  setCurrentText,
  setNavbarVisibility,
  setDataNoticeVisible,
  setPage,
  setPageReload,
} from "../../actions";
import { SectionSeparator, FADE_DURATION } from "../../styles/shared";
import {
  TextTopAnchor,
  TextWrapper,
  TextHeader,
  TextTitle,
  TextSubtitle,
  TextBody,
  TextSeparator,
} from "../../styles/text";
import { AnimatedContent } from "../../animations/shared";
import { AnimatedTextLink, AnimatedTextButton } from "../../animations/text";
import { BOOKS, BOOK_LIST, TEXTS, TEXT_NAMES } from "./../../data/constants";
import CentredButton from "../UI/CentredButton/CentredButton";
import SmallSpinner from "../UI/SmallSpinner/SmallSpinner";
import BlogImage from "../Blog/BlogNote/BlogImage/BlogImage";

const Credits = lazy(() => import("./Credits/Credits"));
const DescriptionPanel = lazy(() =>
  import("./DescriptionPanel/DescriptionPanel")
);
const NextTextLink = lazy(() => import("./NextTextLink/NextTextLink"));
const SubpageLinks = lazy(() => import("../UI/SubpageLinks/SubpageLinks"));
const CopyrightNote = lazy(() => import("../UI/CopyrightNote/CopyrightNote"));

export const Text = (props) => {
  //blogpost to be displayed
  const [piece, setPiece] = useState("");

  //visibility of the content
  const [visible, setVisible] = useState(false);

  //specifies whether 'up next' link should be displayed
  const [linkVisible, setlinkVisible] = useState(false);

  //specifies whether the preorder button should be visible
  const [preorderBtnVisible, setPreorderBtnVisible] = useState(false);

  //shows the content
  const showContent = () => {
    //shows content
    setTimeout(() => setVisible(true), FADE_DURATION + 200);
    props.setPageReload(false);
  };

  //shows the preorder button
  const showPreorderBtn = () => {
    //do it only if other content is visible
    if (visible) setPreorderBtnVisible(true);
  };

  //shows the 'up next' link
  const showLink = () => {
    //do it only if other content is visible
    if (visible) setlinkVisible(true);
  };

  //hides the 'up next' link
  const hideLink = () => {
    setlinkVisible(false);
  };

  //sets off page reloading animation
  const reloadPage = () => {
    props.setPageReload(true);
  };

  //Checks if the id in the current url matches any text; if not, returns 'cetacean'
  const checkTextID = (name) => {
    for (let i = 0; i < TEXT_NAMES.length; i++) {
      if (TEXT_NAMES[i] === name) return name;
    }

    return "cetacean";
  };

  //the name of the text to be displayed
  const textName = checkTextID(props.match.params.id);

  //the markdown file name of the text to be displayed
  const filename = TEXTS[props.lang][textName].filename;

  //the index of the text
  const textIndex = TEXT_NAMES.indexOf(textName);

  //The next text to be displayed;
  const nextTextId = textIndex < TEXT_NAMES.length - 1 ? textIndex + 1 : 0;

  //The next text name
  const nextTextName = TEXT_NAMES[nextTextId];

  //updates the currently displayed text
  const updateText = () => {
    props.setCurrentText(textName);
  };

  //theme to be used - based on the current text or black-and-white if the black-and-white mode is on
  const themeToUse = props.bwMode
    ? "blackAndWhite"
    : TEXTS[props.lang][textName].theme;

  //updates current theme
  const updateTheme = () => {
    props.setTheme(themeToUse);
  };

  //shows the NavBar
  const showNavbar = () => {
    props.setNavbarVisibility(true);
  };

  //checks whether the data storage notice should be displayed and turns it on if it is invisible but hasn't been confirmed yet
  const checkDataNotice = () => {
    if (!props.noticeAccepted) {
      props.setDataNoticeVisible(true);
    }
  };

  //lets the Redux store know which page is currently displayed
  const setCurrentPage = (page) => {
    props.setPage(page);
  };

  //imports markdown documents and coverts it into text
  const importText = (id) => {
    import(`./../../data/texts/${id}.md`)
      .then((res) => {
        fetch(res.default)
          .then((res) => res.text())
          .then((res) => setPiece(res))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    //Update page title with the piece title
    document.title = `Łukasz Drobnik - ${TEXTS[props.lang][textName].title}`;

    //imports markdown documents and coverts it into text
    importText(filename);

    //update the theme depending on the text displayed
    updateTheme();

    //update the currently displayed text
    updateText();

    //show Navbar
    showNavbar();

    //checks whether data storage notice should be visible and if so, turn is on
    checkDataNotice();

    //lets the Redux store know that the Text page is currently displayed
    setCurrentPage("text");

    //show content after a while if page has loaded and the markdown file has been successfully fetched
    if (piece.length > 0 && props.loaded) showContent();
  });

  useEffect(() => {
    //reset piece content and visibility
    setPiece("");
    setVisible(false);
  }, []);

  useEffect(() => {
    //reset piece content and visibility
    setPiece("");
    setVisible(false);
  }, [props.location.pathname]);

  useEffect(() => {
    //reset piece content and visibility
    setPiece("");
    setVisible(false);
  }, [props.reload]);

  //do not show the content until the page is loaded
  return (
    props.loaded && (
      <TextWrapper>
        <TextTopAnchor>
          <div id="top"></div>
        </TextTopAnchor>
        {!props.reload && (
          <AnimatedContent
            pose={piece.length > 0 && visible ? "visible" : "hidden"}
          >
            <TextHeader>
              <TextTitle>{TEXTS[props.lang][textName].title}</TextTitle>
              <TextSubtitle>
                {TEXTS[props.lang][textName].subtitle}
              </TextSubtitle>
            </TextHeader>
            <TextBody>
              <Markdown
                options={{
                  overrides: {
                    separator: {
                      component: TextSeparator,
                    },
                  },
                }}
              >
                {piece}
              </Markdown>
            </TextBody>
            <Waypoint onEnter={hideLink} />
            <Suspense fallback={SmallSpinner}>
              <Credits lang={props.lang} textName={textName} />
            </Suspense>
          </AnimatedContent>
        )}
        {BOOK_LIST.includes(textName) &&
          piece.length > 0 &&
          BOOKS[BOOK_LIST.indexOf(textName)].orderButton[props.lang] &&
          !props.reload && (
            <React.Fragment>
              <Waypoint onEnter={showPreorderBtn} />
              <AnimatedTextButton
                pose={preorderBtnVisible ? "visible" : "hidden"}
              >
                <CentredButton
                  message={
                    BOOKS[BOOK_LIST.indexOf(textName)].orderButton[props.lang]
                  }
                  path={BOOKS[BOOK_LIST.indexOf(textName)].url}
                />
              </AnimatedTextButton>
            </React.Fragment>
          )}

        {!props.reload && (
          <React.Fragment>
            <Suspense fallback={SmallSpinner}>
              <AnimatedContent
                pose={piece.length > 0 && visible ? "visible" : "hidden"}
              >
                <DescriptionPanel
                  description={TEXTS[props.lang][textName].description}
                  title={TEXTS[props.lang][textName].title}
                />
              </AnimatedContent>
            </Suspense>
            <Waypoint onEnter={showLink} />
            <Suspense fallback={SmallSpinner}>
              <AnimatedTextLink
                pose={piece.length > 0 && linkVisible ? "visible" : "hidden"}
              >
                <NextTextLink
                  textName={nextTextName}
                  lang={props.lang}
                  onClick={reloadPage}
                />
              </AnimatedTextLink>
            </Suspense>
            <Waypoint onEnter={showLink} />
            <Suspense fallback={SmallSpinner}>
              <AnimatedContent
                pose={piece.length > 0 && visible ? "visible" : "hidden"}
              >
                <SubpageLinks
                  lang={props.lang}
                  reloadPage={reloadPage}
                  text={true}
                />
                <Waypoint onEnter={showLink} />
                <SectionSeparator />
                <CopyrightNote />
                <Waypoint onEnter={showLink} />
              </AnimatedContent>
            </Suspense>
          </React.Fragment>
        )}
      </TextWrapper>
    )
  );
};

const mapStateToProps = (state) => {
  return {
    lang: state.language,
    bwMode: state.blackAndWhite,
    noticeVisible: state.dataNoticeVisible,
    noticeAccepted: state.dataNoticeAccepted,
    reload: state.pageReload,
    loaded: state.pageLoaded,
  };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      setTheme,
      setCurrentText,
      setNavbarVisibility,
      setDataNoticeVisible,
      setPage,
      setPageReload,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Text);
