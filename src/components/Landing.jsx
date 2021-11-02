import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Select from "react-select";

const Landing = ({ sportOptions, yearOptions }) => {
    const [sport, setSport] = useState(null);
    const [year, setYear] = useState(null);

    return (
        <div className="landing">
            <div className="landing-search-container">
                <div className="landing-background" />
                <h1>Find that card you've always been looking for.</h1>
                <h3>We've got a f**kton of cards, so new arrivals weekly!</h3>
                <form className="landing-search">
                    <div className="search-container">
                        <Select
                            onChange={setSport}
                            options={sportOptions}
                            placeholder="Select Sport"
                            className="react-select"
                            classNamePrefix="react-select"
                        />
                    </div>
                    <div className="search-container">
                        <Select
                            onChange={setYear}
                            options={yearOptions}
                            placeholder="Select Year"
                            className="react-select"
                            classNamePrefix="react-select"
                        />
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
