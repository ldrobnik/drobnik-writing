import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

import BookTile from './BookTile/BookTile';
import PressTile from './PressTile/PressTile';
import CollectionTile from './CollectionTile/CollectionTile';

import { PUBLICATIONS } from '../../../../data/constants';

const StyledWrapper = styled.div`

`;

const Pubs = (props) => {

    //specifies whether texts in English should be displayed
    const [en, setEn] = useState(true);

    //specifies whether texts in Polish should be displayed
    const [pl, setPl] = useState(true);

    //toggles the display of English pubs and if both en and pl are false, sets pl to true
    const setEnHandler = () => {
        setEn(!en);
        if (en && !pl) setPl(true);
    };

    //toggles the display of Polish pubs and if both en and pl are false, sets en to true
    const setPlHandler = () => {
        setPl(!pl);
        if (!en && pl) setEn(true);
    };

    return (
        <StyledWrapper>
            <h1>Publications</h1>
            <label>
                <input
                    type='checkbox'
                    checked={en}
                    onChange={setEnHandler}
                />
                English
            </label>
            <label>
               <input
                type='checkbox'
                checked={pl}
                onChange={setPlHandler}
            />
            Polish
            </label>

            <h3>Books</h3>
            {PUBLICATIONS.books.map((book) => {
                if ((en && (book.language === 'en')) || (pl && (book.language == 'pl'))) {
                    return (
                        <BookTile
                            title={book.title}
                            year={book.year}
                            url={book.url}
                            descriptionPl={book.descriptionPl}
                            descriptionEn={book.descriptionEn}
                            language={book.language}
                            key={book.title}/>
                    )
                }
            })}
            <h3>Press</h3>
            {PUBLICATIONS.press.map((press) => {
                if ((en && (press.language === 'en')) || (pl && (press.language == 'pl'))) {
                    return (
                        <PressTile
                            title={press.title}
                            issue={press.issue}
                            year={press.year}
                            url={press.url}
                            descriptionPl={press.descriptionPl}
                            descriptionEn={press.descriptionEn}
                            language={press.language}
                            key={press.title + press.issue}/>
                    )
                }
            })}
            <h3>Collections</h3>
            {PUBLICATIONS.collections.map((collection) => {
                if ((en && (collection.language === 'en')) || (pl && (collection.language == 'pl'))) {
                    return (
                        <CollectionTile
                            title={collection.title}
                            year={collection.year}
                            url={collection.url}
                            descriptionPl={collection.descriptionPl}
                            descriptionEn={collection.descriptionEn}
                            language={collection.language}
                            key={collection.title}/>
                    )
                }
            })}
        </StyledWrapper>
    );
};

export default Pubs;