import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "../assets/svg icons/SearchIcon";
import ProfileIcon from "../assets/svg icons/ProfileIcon";
import { SHOPPING_CART_ICON_LARGE } from "../assets/svg icons/ShoppingCartIcons";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";
import { useQueryParams } from "./utils";

const Header = ({ cartCount, handleSearch }) => {
    const searchInput = useRef(null);

    let queryParams = useQueryParams();
    const [cardSearch, setCardSearch] = useState(queryParams.get("search"));

    const handleChangeCardSearchText = (e) => setCardSearch(e.target.value);

    useEffect(() => {
        let node = searchInput.current;

        const searchOnEnter = ({ key }) => {
            if (key === "Enter") {
                handleSearch({ cardSearch });
            }
        };

        node.addEventListener("keyup", searchOnEnter);

        return () => node && node.removeEventListener("keyup", searchOnEnter);
    }, [searchInput, cardSearch, handleSearch]);

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
                    <li>
                        <NavLink to="/" className="link">
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/shop" className="link">
                            Shop
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/about" className="link">
                            About Ken
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/contact" className="link">
                            Contact
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/trackorder" className="link">
                            Track Order
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="center-bottom-section">
                <NavLink to="/" className="link">
                    <Logo />
                </NavLink>
            </div>
            <div className="right-bottom-section">
                <ul className="right-bottom-list">
                    <li>
                        <NavLink to="/logIn" className="link">
                            <ProfileIcon />
                            <span style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                Log In
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/checkout" className="link">
                            <div className="shopping-cart-with-indicator">
                                <div className="shopping-cart-indicator">
                                    <span>{cartCount}</span>
                                </div>
                                <SHOPPING_CART_ICON_LARGE />
                            </div>
                            <span className="view-cart-text" style={{ paddingLeft: "10px" }}>
                                Checkout
                            </span>
                        </NavLink>
                    </li>
                </ul>
            </div>
            <div className="keyword-search">
                <div className="left-edge" />
                <div className="right-edge" />
                <div className="search-box">
                    <div className="left-edge" />
                    <input
                        type="text"
                        placeholder="Search for a card"
                        onChange={handleChangeCardSearchText}
                        defaultValue={queryParams.get("search")}
                        ref={searchInput}
                    />
                    <div className="right-edge search-icon-container" onClick={handleSearch}>
                        <SearchIcon />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
