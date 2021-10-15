import React from "react";
import "../assets/Header.css";

const Header = () => {
    return <div className="header">
        <div className="left-top-section">
            <ul className="left-top-nav">
                <li>About Ken</li>
                <li>Contact</li>
                <li>Track Order</li>
            </ul>
        </div>
        <div className="center-top-section">
            SPORTS CARDS AND MEMORABILIA
        </div>
        <div className="right-top-section"></div>

        <div className="left-center-section"></div>
        <div className="center-center-section"></div>
        <div className="right-center-section"></div>

        <div className="left-bottom-section"></div>
        <div className="center-bottom-section"></div>
        <div className="right-bottom-section"></div>
    </div>;
};

export default Header;