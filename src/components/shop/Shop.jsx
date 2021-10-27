import React, { useState } from "react";
import Card from "./Card";
import RadioList from "../fields/RadioList";
import { PAGINATION_SIZES, generateCardSorter, generateCardFilter } from "./utils";

const Shop = ({ cards }) => {
    const [paginationSize, setPaginationSize] = useState(PAGINATION_SIZES[0]);
    const [sortOrder, setSetOrder] = useState("ALPHA ASC");
    const [upperPriceRange, setUpperPriceRange] = useState(5000);

    const [sportFilter, setSportFilter] = useState(null);

    const handleFilterSport = (e) => {
        e.stopPropagation();
        if (sportFilter === e.target.innerText) {
            setSportFilter(null);
        } else {
            setSportFilter(e.target.innerText);
        }
    };

    const handleChangePaginationSize = (e) => setPaginationSize(e.target.value);
    const handleChangeUpperPriceLimit = (e) => setUpperPriceRange(e.target.value);
    const handleChangeSortOrder = (e) => setSetOrder(e.target.value);

    const filteredAndSortedCards = cards
        .sort(generateCardSorter(sortOrder))
        .filter(generateCardFilter(sportFilter));

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
                        <p>
                            <input
                                type="range"
                                min="0"
                                max="50000"
                                value={upperPriceRange}
                                onChange={handleChangeUpperPriceLimit}
                            />
                        </p>
                        <p>{`$0 - $${upperPriceRange}`}</p>
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
