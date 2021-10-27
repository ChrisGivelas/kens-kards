import React, { useState } from "react";
import { Range } from "rc-slider";
import Card from "./Card";
import RadioList from "../fields/RadioList";
import {
    PAGINATION_SIZES,
    generateCardSorter,
    generateCardFilters,
    defaultPriceRange,
    defaultUpperPriceRange,
} from "./utils";

const Shop = ({ cards }) => {
    const [paginationSize, setPaginationSize] = useState(PAGINATION_SIZES[0]);
    const [sortOrder, setSetOrder] = useState("ALPHA ASC");

    const [priceRangeFilter, setPriceRangeFilter] = useState(defaultPriceRange);
    const [priceRangeFilterText, setPriceRangeFilterText] = useState(defaultPriceRange);
    const [sportFilter, setSportFilter] = useState(null);

    const handleFilterSport = (e) => {
        e.stopPropagation();
        if (sportFilter === e.target.innerText) {
            setSportFilter(null);
        } else {
            setSportFilter(e.target.innerText);
        }
    };
    const handleFilterPriceRange = (priceRange) => {
        setPriceRangeFilter(priceRange);
    };

    const handleFilterPriceRangeText = (priceRange) => {
        setPriceRangeFilterText(priceRange);
    };

    const handleChangePaginationSize = (e) => setPaginationSize(e.target.value);
    const handleChangeSortOrder = (e) => setSetOrder(e.target.value);

    const filteredAndSortedCards = cards
        .sort(generateCardSorter(sortOrder))
        .filter(generateCardFilters(sportFilter, priceRangeFilter));

    return (
        <div className="shop">
            <div className="shop-grid">
                <div className="shop-filters">
                    <h2>Filters</h2>

                    <div className="filter-container sport-filter">
                        <h3>Sport</h3>
                        <RadioList
                            currentSelection={sportFilter}
                            options={[
                                { id: "Baseball", value: "Baseball" },
                                { id: "Basketball", value: "Basketball" },
                                { id: "Hockey", value: "Hockey" },
                            ]}
                            radioListName="sport-type"
                            handleOnClickOption={handleFilterSport}
                        />
                    </div>

                    <div className="filter-container price-filter">
                        <h3>Price</h3>

                        <Range
                            min={0}
                            max={defaultUpperPriceRange}
                            onChange={handleFilterPriceRangeText}
                            onAfterChange={handleFilterPriceRange}
                            step={500}
                            defaultValue={defaultPriceRange}
                        />
                        <p>{`$${priceRangeFilterText[0]} - $${priceRangeFilterText[1]}${
                            priceRangeFilterText[1] === defaultUpperPriceRange ? "+" : ""
                        }`}</p>
                    </div>

                    <div className="filter-container year-filter">
                        <h3>Year</h3>
                        <input type="text" placeholder="Year" />
                    </div>

                    <div className="filter-container team-filter">
                        <h3>Team</h3>
                        <input type="text" placeholder="Team" />
                    </div>

                    <div className="filter-container subset-filter">
                        <h3>Subset</h3>
                        <input type="text" placeholder="Subset" />
                    </div>
                </div>
                <div className="shop-listings">
                    <div className="shop-config">
                        <div className="showing">
                            <span>Showing 1 - {`${paginationSize} of ${cards.length} cards`}</span>
                            <span style={{ marginLeft: 20 }}>
                                Show:{" "}
                                <select name="view-sizes" onChange={handleChangePaginationSize}>
                                    {PAGINATION_SIZES.map((vs) => (
                                        <option
                                            value={vs}
                                            selected={vs === paginationSize}
                                        >{`${vs}`}</option>
                                    ))}
                                </select>
                            </span>
                        </div>
                        <div className="sort">
                            Sort:{" "}
                            <select name="sort-types" onChange={handleChangeSortOrder}>
                                <option value="ALPHA ASC" selected={sortOrder === "ALPHA ASC"}>
                                    Alphabetical Ascending
                                </option>
                                <option value="ALPHA DESC" selected={sortOrder === "ALPHA DESC"}>
                                    Alphabetical Descending
                                </option>
                                <option value="PRICE ASC" selected={sortOrder === "PRICE ASC"}>
                                    Price - Lowest to Highest
                                </option>
                                <option value="PRICE DESC" selected={sortOrder === "PRICE DESC"}>
                                    Price - Highest to Lowest
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="shop-items">
                        {filteredAndSortedCards.slice(0, paginationSize).map((cardInfo) => (
                            <Card {...cardInfo} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
