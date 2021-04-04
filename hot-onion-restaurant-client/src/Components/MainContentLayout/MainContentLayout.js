import React from 'react';

const MainContentLayout = ({children, title}) => {
    return (
        <div className="shadow mainContent px-2 py-4">
            <h4>{title}</h4>
            <hr/>
            {children}
        </div>
    );
};

export default MainContentLayout;