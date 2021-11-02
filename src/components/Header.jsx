import React from "react";
import MenuIcon from "../assets/svg icons/MenuIcon";
import ProfileIcon from "../assets/svg icons/ProfileIcon";
import { SHOPPING_CART_ICON_LARGE } from "../assets/svg icons/ShoppingCartIcons";
import Logo from "./Logo";

const Header = ({ cartCount }) => {
    return (
        <div className="header">
            <div className="left-top-section">
                <ul className="left-top-list">
                    <li style={{ color: "white" }}>Call Us: (999) 999-9999</li>
                </ul>
            </div>
            <div className="center-top-section">A pop-up sports cards store.</div>
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
                        <div className="shopping-cart-with-indicator">
                            <div className="shopping-cart-indicator">
                                <span>{cartCount}</span>
                            </div>
                            <SHOPPING_CART_ICON_LARGE />
                        </div>
                        <span style={{ paddingLeft: "10px" }}>Shopping Cart</span>
                    </li>
                </ul>
            </div>
            <div className="keyword-search">
                <div className="left-edge" />
                <div className="right-edge" />
                <div className="search-box">
                    <div className="left-edge" />
                    <div className="right-edge" />
                    <input type="text" placeholder="Search for a card" />
                </div>
            </div>
        </div>
    );
};

export default Header;
