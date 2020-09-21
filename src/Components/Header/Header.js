import React from 'react';
import Slider from '../Slider/Slider';
import TitleBar from '../TitleBar/TitleBar';

const Header = () => {
    return (
        <div>
            <TitleBar></TitleBar>
            <Slider></Slider>
        </div>
    );
};

export default Header;