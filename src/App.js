import React from 'react';
import {ThemeProvider} from 'styled-components';

import Home from './components/Home/Home';

// Theme to be used in the project
const theme = {
    //colours
    nocturine: '#a98086',
    cunninghamella: '#566f0c',
    vostok: '#a67847',
    entropia: '#616a65',
    devonian: '#99aac6',
    obrovsky: '#b34a53',
    lightColor: '#e5e5e5',
    darkColor: '#1b1b1b',

    //fonts
    sansSerif: `'Maven Pro', sans-serif`,
    serif: `'Roboto Slab', serif`
};

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Home />
        </ThemeProvider>
    );
}

export default App;
