import React from 'react';
import TitleBar from '../TitleBar/TitleBar';

const NotFound = () => {
    return (
        <div>
            <TitleBar/>
            <h1 className="text-danger">This is not a correct route</h1>
        </div>
    );
};

export default NotFound;