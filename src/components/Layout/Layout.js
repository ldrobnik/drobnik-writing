import React from 'react';

const layout = props => (
    <React.Fragment>
        <div>Toolbar</div>
        <main>
            {props.children}
        </main>
    </React.Fragment>
);

export default layout;