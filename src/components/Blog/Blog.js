import React, {useState, useEffect} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    setTheme,
    setCurrentText,
    setNavbarVisibility,
    setDataNoticeVisible,
    setPage,
    setPageReload
} from '../../actions';
import {AnimatedContent} from '../../posed';
import {BlogTopAnchor, BlogWrapper, BlogSectionHeading, BlogTitle, FADE_DURATION} from '../../styled';
import {BLOG_CATEGORIES, BLOG_NOTES, WEBSITE_TEXT} from './../../data/constants';
import ThemeWrapper from './ThemeWrapper/ThemeWrapper';
import Teaser from './Teaser/Teaser';
import SectionSeparator from '../UI/SectionSeparator/SectionSeparator';
import SubpageLinks from '../UI/SubpageLinks/SubpageLinks';
import CopyrightNote from '../UI/CopyrightNote/CopyrightNote';
import BlogNoteList from './BlogNoteList/BlogNoteList';

export const Blog = props => {

    // //filepath to a sample markdown document
    // const filename = 'markdown';

    //latest note to be displayed
    const [latestNote, setLatestNote] = useState('');

    // list of blog notes to be linked under the latest blog note
    const [olderNotes, setOlderNotes] = useState([])


    //specifies whether category filtering is on
    const [isFiltered, setIsFiltered] = useState(false);

    //shows the content
    const showContent = () => {
        props.setPageReload(false);
    };

    //sets off page reloading animation
    const reloadPage = () => {
        props.setPageReload(true);
    };

    //checks whether the data storage notice should be displayed and turns it on if it is invisible but hasn't been confirmed yet
    const checkDataNotice = () => {
        if (!props.noticeAccepted) {
            props.setDataNoticeVisible(true);
        }
    };

    //shows the NavBar
    const showNavbar = () => {
        props.setNavbarVisibility(true);
    };

    //sets black and white theme
    const setBwTheme = () => {
        props.setTheme('blackAndWhite');
    };

    //lets the Redux store know which page is currently displayed
    const setCurrentPage = page => {
        props.setPage(page);
    }

    //checks if the blog notes should be filtered by category
    const checkFiltering = () => {

        //get property names of the blog categories
        let blogCategories = Object.keys(BLOG_CATEGORIES);

        //check if the url contains the name of any category
        for (let category of blogCategories) {
            if (props.location.pathname.includes(category)) {
                setIsFiltered(true); //turns on the filtered mode
                return category;
            }
        }
        ;

        //if the url doesn't match any category, return false
        setIsFiltered(false); //turns off the filtered mode
        return false
    }


    //filters blog notes by category
    const filterByCategory = category => {

        //an array to hold all notes matching the category
        let filteredNotes = [];


        for (let note of BLOG_NOTES) {
            //if the category of the note matches the selected category, add it to the array
            if (note.category === category) {
                filteredNotes.push(note);
            }
        }

        return filteredNotes;
    }

    //removes the first element of an array
    const removeFirstElement = (array) => {
        let [, ...shortenedArray] = array;

        return shortenedArray;
    }

    useEffect(() => {

        //reload page when url changes
        reloadPage();

        //if the url contains category name, filter blog notes by this category
        let filteredCategory = checkFiltering();

        if (checkFiltering()) {
            setLatestNote(filterByCategory(filteredCategory)[0]); // sets the latest note
            setOlderNotes(removeFirstElement(filterByCategory(filteredCategory))); // sets older notes
        } else {
            setLatestNote(BLOG_NOTES[0]); // sets the latest note
            setOlderNotes(removeFirstElement(BLOG_NOTES)); // sets older notes
        }

    }, [props.location.pathname])

    useEffect(() => {
        //Update page title with the piece title
        document.title = WEBSITE_TEXT.blog.title;

        //sets theme to black and white
        setBwTheme();

        //show Navbar
        showNavbar();

        //checks whether data storage notice should be visible and if so, turn is on
        checkDataNotice();

        //lets the Redux store know that the Text page is currently displayed
        setCurrentPage('blog');

        //show content after a while if page has loaded
        if (props.loaded) {
            setTimeout(showContent, FADE_DURATION);
        }

    });

    //do not show the content until the page is loaded
    return props.loaded &&
        <BlogWrapper>
            <BlogTopAnchor>
                <div id='top'></div>
            </BlogTopAnchor>
            <BlogTitle>{WEBSITE_TEXT.blog.title}</BlogTitle>
            {(latestNote.id) &&
            <React.Fragment>
                <BlogSectionHeading>{WEBSITE_TEXT.blog.latestPost}</BlogSectionHeading>
                <Teaser note={latestNote}/>
            </React.Fragment>
            }
            {(olderNotes.length > 0) &&
            <React.Fragment>
                <BlogSectionHeading>{WEBSITE_TEXT.blog.olderPosts}</BlogSectionHeading>
                <BlogNoteList
                    linklist={olderNotes}
                    showImmediately={true}
                    showCategories={!isFiltered}
                />
            </React.Fragment>
            }
            <AnimatedContent
                pose={!props.reload ? 'visible' : 'hidden'}
            >
                <SubpageLinks
                    lang={'en'}
                    reloadPage={reloadPage}
                    blog={isFiltered}
                />
                <SectionSeparator/>
                <CopyrightNote/>
            </AnimatedContent>
        </BlogWrapper>;
};

const mapStateToProps = state => {
    return {
        lang: state.language,
        bwMode: state.blackAndWhite,
        noticeVisible: state.dataNoticeVisible,
        noticeAccepted: state.dataNoticeAccepted,
        reload: state.pageReload,
        loaded: state.pageLoaded
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setTheme,
        setCurrentText,
        setNavbarVisibility,
        setDataNoticeVisible,
        setPage,
        setPageReload
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);