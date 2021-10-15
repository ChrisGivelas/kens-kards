import React from "react";
import MenuIcon from "../assets/MenuIcon";
import ProfileIcon from "../assets/ProfileIcon";
import ShoppingCartIcon from "../assets/ShoppingCartIcon";
import Logo from "./Logo";

const Header = () => {
    return (
        <div className="header">
            <div className="left-top-section">
                <ul className="left-top-list">
                    <li style={{ color: "white" }}>Call Us: (999) 999-9999</li>
                </ul>
            </div>
            <div className="center-top-section">
                SPORTS CARDS AND MEMORABILIA
            </div>
            <div className="right-top-section">
                <ul className="right-top-list">
                    <li>
                        <button style={{ all: "unset" }}>Currency: CAD</button>
                    </li>
                </ul>
            </div>

            <div className="left-bottom-section">
                <ul className="left-bottom-list">
                    <li className="menu">
                        <MenuIcon />
                        <span style={{ paddingLeft: "10px" }}>Menu</span>
                    </li>
                    <li>Home</li>
                    <li>Shop</li>
                    <li>About Ken</li>
                    <li>Contact</li>
                    <li>Track Order</li>
                </ul>
            </div>
            <div className="center-bottom-section">
                <Logo />
            </div>
            <div className="right-bottom-section">
                <ul className="right-bottom-list">
                    <li>
                        <ProfileIcon />
                        <span style={{ paddingLeft: "10px" }}>Log In</span>
                    </li>
                    <li>
                        <ShoppingCartIcon withIndicator />
                        <span style={{ paddingLeft: "10px" }}>
                            Shopping Cart
                        </span>
                    </li>
                </ul>
            </div>
            <div className="keyword-search">
                <div className="left-edge" />
                <div className="right-edge" />
                <div className="search-box">
                    <div className="left-edge" />
                    <div className="right-edge" />
                    <input
                        type="text"
                        placeholder="Enter a keyword to search for a card"
                    />
                </div>
            </div>
        </div>
    );
};

export default Header;
