import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {AnimatedContent} from '../../../animations/shared';
import {FilteredCategoryWrapper, FilteredCategoryHeading, FilteredCategoryLink} from '../../../styles/blog';
import ThemeWrapper from '../../ThemeWrapper/ThemeWrapper';
import {setPageReload} from '../../../actions';
import {WEBSITE_TEXT_BLOG, BLOG_CATEGORIES} from '../../../data/constants';

export const FilteredCategory = props => {

    //sets off page reloading animation
    const reloadPage = () => {
        props.setPageReload(true);
    };


    //do not show the content until the page is loaded
    return (
        <AnimatedContent
            pose={!props.reload ? 'visible' : 'hidden'}>
            <FilteredCategoryWrapper>
                <ThemeWrapper theme={props.category}>
                    <FilteredCategoryHeading>
                        {`${WEBSITE_TEXT_BLOG.displayedCategory} ${BLOG_CATEGORIES[props.category]}`}
                    </FilteredCategoryHeading>
                </ThemeWrapper>
            </FilteredCategoryWrapper>
            <Link
                to={`/blog/`}
                onClick={reloadPage}
            >
                <FilteredCategoryLink>
                    {WEBSITE_TEXT_BLOG.showAll}
                </FilteredCategoryLink>
            </Link>
        </AnimatedContent>
    );
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({setPageReload}, dispatch);
};

export default connect(null, mapDispatchToProps)(FilteredCategory);