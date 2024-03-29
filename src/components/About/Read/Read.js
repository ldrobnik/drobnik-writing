import React, {useState, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Waypoint} from 'react-waypoint';
import {setPageReload} from '../../../actions';
import {SectionSeparator, FADE_DURATION} from '../../../styles/shared';
import {ReadWrapper, ReadMessage, ReadBlogBtnWrapper} from '../../../styles/about';
import {AnimatedContent} from '../../../animations/shared';
import {AnimatedReadButton} from '../../../animations/about';
import {WEBSITE_TEXT_ABOUT} from './../../../data/constants';
import SectionHeading from './../../UI/SectionHeading/SectionHeading'
import SectionLinks from '../SectionLinks/SectionLinks';
import ReadList from '../../ReadList/ReadList';
import ReadListElement from '../../ReadList/ReadListElement/ReadListElement';
import CentredButton from '../../UI/CentredButton/CentredButton';


export const Read = props => {

    //specifies whether text links should be visible
    const [linksVisible, setLinksVisible] = useState(false);

    //specifies whether the blog button should be visible
    const [blogBtnVisible, setBlogBtnVisible] = useState(false);

    //shows the content
    const showContent = () => {
        props.setPageReload(false);
    };

    //shows the text links
    const showLinks = () => {
        setLinksVisible(true);
    };

    //hides the text links
    const hideLinks = () => {
        setLinksVisible(false);
    };

    //shows the blog button
    const showBlogButton = () => {
        setTimeout(() => setBlogBtnVisible(true), 1500);
    }

    //hides the blog button
    const hideBlogButton = () => {
        setBlogBtnVisible(false);
    }

    //hide message whenever the pathname or language change
    useEffect(() => {
            setTimeout(() => {
                hideLinks();
                hideBlogButton();
            }, 100);
        },
        [props.location.pathname, props.lang]
    );

    useEffect(() => {

        //show content after a while
        setTimeout(showContent, FADE_DURATION);
    });

    return (
        <ReadWrapper>

            <AnimatedContent
                pose={!props.reload ? 'visible' : 'hidden'}>
                <SectionHeading
                    title={WEBSITE_TEXT_ABOUT.read.title[props.lang]}
                    subtitle=""
                />
                <ReadMessage>{WEBSITE_TEXT_ABOUT.read.introduction[props.lang]}</ReadMessage>
            </AnimatedContent>
            <Waypoint
                onEnter={showLinks}
            />
            <ReadList linksVisible={linksVisible} />
            {(props.lang === 'en') &&
            <ReadBlogBtnWrapper>
                <AnimatedReadButton
                    pose={blogBtnVisible ? 'visible' : 'hidden'}>
                    <CentredButton
                        message={WEBSITE_TEXT_ABOUT.read.blogButton}
                        path={'/blog'}
                    />
                </AnimatedReadButton>
                <Waypoint
                    onEnter={showBlogButton}
                />
            </ReadBlogBtnWrapper>}
            <AnimatedContent
                pose={!props.reload ? 'visible' : 'hidden'}>
                <SectionLinks
                    lang={props.lang}
                    top={true}
                    books={true}
                    pubs={true}
                    read={false}
                />
                <Waypoint
                    onEnter={showLinks}
                />
                <SectionSeparator/>
            </AnimatedContent>
            <Waypoint
                onEnter={showLinks}
            />
            <Waypoint
                onEnter={showBlogButton}
            />
        </ReadWrapper>
    );
};

const mapStateToProps = state => {
    return {
        lang: state.language,
        reload: state.pageReload
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({setPageReload}, dispatch);
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Read));