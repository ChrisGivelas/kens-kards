import React from "react";
import { NavLink } from "react-router-dom";

const Landing = () => {
    return (
        <div className="landing">
            <div className="landing-search-container">
                <div className="landing-background" />
                <h1>Find that card you've always been looking for.</h1>
                <h3>We've got a f**kton of cards, so new arrivals weekly!</h3>
                <form className="landing-search">
                    <div className="search-container">
                        <input type="text" placeholder="Select Sport" />
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Select Year" />
                    </div>
                    {/* Not sure if we need these fitlers yet
                     <div className="search-container">
                        <input type="text" placeholder="Select Team" />
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Select Subset" />
                    </div> */}
                    <div className="search-container">
                        <NavLink to="/shop">
                            <input type="submit" value="Search" />
                        </NavLink>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Landing;
