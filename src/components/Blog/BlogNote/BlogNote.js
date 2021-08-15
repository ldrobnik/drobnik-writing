import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Markdown from 'markdown-to-jsx/dist/index.js';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import {HighlightedMarkdown} from '../highlighted-markdown';
import {
    setTheme,
    setCurrentText,
    setNavbarVisibility,
    setDataNoticeVisible,
    setPage,
    setPageReload
} from '../../../actions';
import {AnimatedContent} from '../../../posed';
import {BlogTopAnchor, BlogPost, BlogWrapper, BlogSeparator, BlogNoteReadMore, FADE_DURATION} from '../../../styled';
import {WEBSITE_TEXT, BLOG_NOTES} from './../../../data/constants';
import ThemeWrapper from './../ThemeWrapper/ThemeWrapper';
import BlogBio from './BlogBio/BlogBio';
import BlogNoteList from '../BlogNoteList/BlogNoteList';
import BlogNoteCredits from '../BlogNoteCredits/BlogNoteCredits';
import SectionSeparator from '../../UI/SectionSeparator/SectionSeparator';
import SubpageLinks from '../../UI/SubpageLinks/SubpageLinks';
import CopyrightNote from '../../UI/CopyrightNote/CopyrightNote';

export const BlogNote = props => {


    const history = useHistory();

    //go to the main blog page

    const goToMainBlogPage = () => history.push('/blog');

    //ID of the blog note to be displayed
    const [noteId, setNoteId] = useState('');

    //title of the blog note
    const [noteTitle, setNoteTitle] = useState('');

    //publish date of the blog note
    const [noteDate, setNoteDate] = useState();

    //category of the blog note
    const [noteCategory, setNoteCategory] = useState('');

    //related notes displayed below the text
    const [relatedNotes, setRelatedNotes] = useState([]);


    //blogpost to be displayed
    const [note, setNote] = useState('');

    //shows the content
    const showContent = () => {
        props.setPageReload(false);
    };

    //creates an array of related notes
    const createRelatedNotes = relatedNoteIds => {

        //an array to hold all notes that match the IDs
        let relatedNotes = [];

        for (let id of relatedNoteIds) {
            for (let note of BLOG_NOTES) {
                //if the id of the note matches the related note id, add it to the array
                if (note.id === id) {
                    relatedNotes.push(note);
                }
            }
        }

        return relatedNotes;
    }

    //checks blog note data
    const identifyBlogNote = () => {

        //the base URL for all blog notes
        let baseUrl = '/blog/notes/';


        for (let note of BLOG_NOTES) {

            //if the URL includes the blog note ID, set the data of this note
            if ((baseUrl + note.id === props.location.pathname) || (baseUrl + note.id + '/' === props.location.pathname)) {

                //set note data
                setNoteId(note.id); //ID
                setNoteTitle(note.title); //Title
                setNoteDate(note.date); //Date
                setNoteCategory(note.category);
                setRelatedNotes(createRelatedNotes(note.related));

                return true;
            }
        }


        //if the URL doesn't match any blog note, go to the main blog page
        goToMainBlogPage();

    }

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
    const setCurrentPage = (page) => {
        props.setPage(page);
    }

    //imports blog note
    const importBlogNote = noteId => {
        //imports markdown documents and coverts it into text
        import(`./../../../data/blognotes/${noteId}.md`)
            .then(res => {
                fetch(res.default)
                    .then(res => res.text())
                    .then(res => setNote(res))
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        //Update page title with the piece title
        document.title = 'Łukasz Drobnik - ' + noteTitle;


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

    useEffect(() => {

        //if the blog note hasn't been loaded yet, identify the blog note based on the URL
        if (note.length < 1) identifyBlogNote();

        //imports markdown documents and coverts it into text
        importBlogNote(noteId);

    });

    //load a new blog note anytime the path changes
    useEffect(() => {

        //identify the blog note based on the URL
        identifyBlogNote();

        //imports markdown documents and coverts it into text
        importBlogNote(noteId);

    }, [props.location.pathname]);

    //do not show the content until the page is loaded
    return props.loaded && (noteId.length > 0) &&
        <BlogWrapper>
            <BlogTopAnchor>
                <div id='top'></div>
            </BlogTopAnchor>
            <ThemeWrapper theme={noteCategory}>
                <AnimatedContent
                    pose={!props.reload ? 'visible' : 'hidden'}>
                    <BlogNoteCredits
                        title={noteTitle}
                        category={noteCategory}
                        date={noteDate}
                    />
                </AnimatedContent>
                <BlogPost>
                    <AnimatedContent
                        pose={!props.reload ? 'visible' : 'hidden'}>
                        <HighlightedMarkdown>
                            <Markdown
                                options={{
                                    overrides: {
                                        a: {
                                            props: {
                                                target: '_blank',
                                                rel: 'noopener noreferrer'
                                            },
                                        },
                                    },
                                }}
                            >
                                {note}
                            </Markdown>
                        </HighlightedMarkdown>
                    </AnimatedContent>
                    <div id='bio'></div>
                    <AnimatedContent
                        pose={!props.reload ? 'visible' : 'hidden'}>
                        <BlogSeparator className={'colouredBackground'}/>
                        <BlogBio/>
                        <BlogSeparator className={'colouredBackground'}/>
                        <BlogNoteReadMore className={'coloured'}>
                            {WEBSITE_TEXT.blog.readMore}
                        </BlogNoteReadMore>
                    </AnimatedContent>
                </BlogPost>
            </ThemeWrapper>

            <BlogNoteList
                linklist={relatedNotes}
                showCategories={true}
            />
            <AnimatedContent
                pose={!props.reload ? 'visible' : 'hidden'}
            >
                <SubpageLinks
                    lang={'en'}
                    reloadPage={reloadPage}
                    blog={true}
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

export default connect(mapStateToProps, mapDispatchToProps)(BlogNote);