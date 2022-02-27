import React, {useState, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Waypoint} from 'react-waypoint';
import {setPageReload} from '../../../actions';
import {FADE_DURATION, SmallSeparator} from '../../../styles/shared';
import {BookPageBody, BookPageSlogan, BookPageTopPanel} from '../../../styles/bookpage';
import {AnimatedContent} from '../../../animations/shared';
import {BookAnimatedButton} from '../../../animations/about';
import {EXCERPT_BUTTON, BOOKS} from '../../../data/constants';
import CentredPhoto from '../../UI/CentredPhoto/CentredPhoto';
import SectionHeading from '../../UI/SectionHeading/SectionHeading'
import QuoteList from '../../About/QuoteList/QuoteList';
import CentredButton from '../../UI/CentredButton/CentredButton';
import SectionLinks from '../../About/SectionLinks/SectionLinks';

export const BookDetails = props => {

    //specifies whether the quotes should be displayed - triggered by scrolling to the Waypoint element
    const [quotesVisible, setQuotesVisible] = useState(false);


    //specifies whether the excerpt button should be visible
    const [excerptBtnVisible, setExcerptBtnVisible] = useState(false);

    //shows the content
    const showContent = () => {
        props.setPageReload(false);
    };


    //sets quote visibility to true
    const showQuotes = () => {
        setQuotesVisible(true);
    };

    //sets excerpt button visibility to true
    const showExcerptBtn = () => {
        setExcerptBtnVisible(true);
    };

    //sets quotes and button visibility to false
    const hideElements = () => {
        setQuotesVisible(false);
        setExcerptBtnVisible(false);
    };


    useEffect(() => {

        //show content after a while
        setTimeout(showContent, FADE_DURATION);
    });

    //whenever the pathname or language change
    useEffect(() => {

            //hide elements
            setTimeout(hideElements, 100);
        },
        [props.location.pathname, props.lang]
    );

    return (
        <React.Fragment>
            <AnimatedContent
                pose={!props.reload ? 'visible' : 'hidden'}>
                <BookPageTopPanel>
                    <CentredPhoto
                        src={BOOKS[props.book].cover}
                        alt='Book cover'
                        link={BOOKS[props.book].url}
                    />
                    <BookPageSlogan>
                        <h1>{BOOKS[props.book].title[props.lang]}</h1>
                        <p>{BOOKS[props.book].slogan[props.lang]}</p>
                    </BookPageSlogan>
                </BookPageTopPanel>
            </AnimatedContent>
            <AnimatedContent
                pose={!props.reload ? 'visible' : 'hidden'}>
                <BookPageBody>
                    <div>
                        {BOOKS[props.book].body[props.lang]}
                    </div>
                </BookPageBody>
            </AnimatedContent>
            <Waypoint
                onEnter={showQuotes}
                bottomOffset="25%"
            />
            <QuoteList
                book={props.book}
                lang={props.lang}
                visible={quotesVisible}
            />
            <Waypoint
                onEnter={showExcerptBtn}
            />
            <BookAnimatedButton
                pose={excerptBtnVisible ? 'visible' : 'hidden'}>
                <CentredButton
                    message={EXCERPT_BUTTON[props.lang]}
                    path={'/texts/' + BOOKS[props.book].id}
                />
            </BookAnimatedButton>
            <Waypoint
                onEnter={showQuotes}
            />
            <Waypoint
                onEnter={showExcerptBtn}
            />
            <AnimatedContent
                pose={!props.reload ? 'visible' : 'hidden'}>
                <Waypoint
                    onEnter={showQuotes}
                />
                <Waypoint
                    onEnter={showExcerptBtn}
                />
            </AnimatedContent>
            <Waypoint
                onEnter={showQuotes}
            />
            <Waypoint
                onEnter={showExcerptBtn}
            />
        </React.Fragment>
    );
};

const mapStateToProps = state => {
    return {
        lang: state.language,
        reload: state.pageReload,
        page: state.pageDisplayed
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({setPageReload}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookDetails));