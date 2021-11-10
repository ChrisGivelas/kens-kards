import React, { useState } from "react";
import Select from "react-select";

const Landing = ({ sportOptions, yearOptions, handleSearch }) => {
    const [sport, setSport] = useState({});
    const [lowerYear, setLowerYear] = useState({});
    const [upperYear, setUpperYear] = useState({});

    const lowerYearOptions =
        upperYear.value === undefined
            ? yearOptions
            : yearOptions.filter((year) => year.value < upperYear.value);
    const upperYearOptions =
        lowerYear.value === undefined
            ? yearOptions
            : yearOptions.filter((year) => year.value > lowerYear.value);

    const handleSearchForSportAndYearRange = () => {
        handleSearch({
            sport: sport.value,
            lowerYear: lowerYear.value,
            upperYear: upperYear.value,
        });
    };

    return (
        <div className="landing">
            <div className="landing-search-container">
                <div className="landing-background" />
                <h1>Find that card you've always been looking for.</h1>
                <h3>We've got a lot of f**king cards, so new arrivals weekly!</h3>
                <form className="landing-search">
                    Find all
                    <div className="search-container">
                        <Select
                            onChange={setSport}
                            options={sportOptions}
                            placeholder="Select Sport"
                            className="react-select"
                            classNamePrefix="react-select"
                        />
                    </div>
                    cards between
                    <div className="search-container">
                        <Select
                            onChange={setLowerYear}
                            options={lowerYearOptions}
                            placeholder="From..."
                            className="react-select"
                            classNamePrefix="react-select"
                        />
                    </div>
                    and
                    <div className="search-container">
                        <Select
                            onChange={setUpperYear}
                            options={upperYearOptions}
                            placeholder="...To"
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
                        <input
                            type="button"
                            value="Search"
                            onClick={handleSearchForSportAndYearRange}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Landing;
