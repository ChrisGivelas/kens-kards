import React from "react";

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
                    <div className="search-container">
                        <input type="text" placeholder="Select Team" />
                    </div>
                    <div className="search-container">
                        <input type="text" placeholder="Select Subset" />
                    </div>
                    <div className="search-container">
                        <input type="submit" value="Search" />
                    </div>
                </form>
            </div>
            {/* <div className="landing-tailfins">
                <div className="left-edge"></div>
                <div className="right-edge"></div>
            </div> */}
        </div>
    );
};

export default Landing;
