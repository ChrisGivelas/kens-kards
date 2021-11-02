import React, { useState } from "react";
import { Range } from "rc-slider";
import Card from "./Card";
import RadioList from "../fields/RadioList";
import {
    PAGINATION_SIZES,
    SORT_TYPES,
    generateCardSorter,
    generateCardFilters,
    DEFAULT_PRICE_RANGE,
    MAX_SELECTABLE_PRICE_RANGE,
    DEFAULT_LOWER_YEAR_RANGE,
    DEFAULT_UPPER_YEAR_RANGE,
    DEFAULT_YEAR_RANGE,
    DEFAULT_SPORT_OPTIONS,
} from "./utils";

const Shop = ({ cards, cart, addItemToCart, removeItemFromCart }) => {
    const [paginationSize, setPaginationSize] = useState(PAGINATION_SIZES[0]);
    const [sortType, setSortType] = useState(SORT_TYPES[0].value);

    const [sportFilter, setSportFilter] = useState(null);
    const [priceRangeFilter, setPriceRangeFilter] = useState(DEFAULT_PRICE_RANGE);
    const [priceRangeFilterText, setPriceRangeFilterText] = useState(DEFAULT_PRICE_RANGE);
    const [yearFilter, setYearFilter] = useState(DEFAULT_YEAR_RANGE);
    const [yearFilterText, setYearFilterText] = useState(DEFAULT_YEAR_RANGE);

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

    const handleFilterYear = (year) => {
        setYearFilter(year);
    };

    const handleFilterYearText = (year) => {
        setYearFilterText(year);
    };

    const handleChangePaginationSize = (e) => setPaginationSize(e.target.value);
    const handleChangeSortType = (e) => {
        e.stopPropagation();
        setSortType(e.target.value);
    };

    const filteredAndSortedCards = cards
        .sort(generateCardSorter(sortType))
        .filter(generateCardFilters(sportFilter, priceRangeFilter, yearFilter));

    return (
        <div className="shop">
            <h1 style={{ padding: "4vh 0px 4vh 0px" }}>Shopping Cart</h1>
            <div className="shop-grid">
                <div className="shop-filters">
                    <h2>Filters</h2>

                    <div className="filter-container sport-filter">
                        <h3>Sport</h3>
                        <RadioList
                            currentSelection={sportFilter}
                            options={DEFAULT_SPORT_OPTIONS.map((sport) => ({
                                id: sport,
                                value: sport,
                            }))}
                            radioListName="sport-type"
                            handleOnClickOption={handleFilterSport}
                        />
                    </div>

                    <div className="filter-container price-filter">
                        <h3>Price</h3>

                        <Range
                            min={0}
                            max={MAX_SELECTABLE_PRICE_RANGE}
                            onChange={handleFilterPriceRangeText}
                            onAfterChange={handleFilterPriceRange}
                            step={500}
                            defaultValue={DEFAULT_PRICE_RANGE}
                            allowCross={false}
                        />
                        <p>{`$${priceRangeFilterText[0]} - $${priceRangeFilterText[1]}${
                            priceRangeFilterText[1] === MAX_SELECTABLE_PRICE_RANGE ? "+" : ""
                        }`}</p>
                    </div>

                    <div className="filter-container year-filter">
                        <h3>Year</h3>
                        <Range
                            min={DEFAULT_LOWER_YEAR_RANGE}
                            max={DEFAULT_UPPER_YEAR_RANGE}
                            onChange={handleFilterYearText}
                            onAfterChange={handleFilterYear}
                            step={10}
                            defaultValue={DEFAULT_YEAR_RANGE}
                            allowCross={false}
                        />
                        <p>{`${yearFilterText[0]} - ${yearFilterText[1]}`}</p>
                    </div>

                    {/* Not sure if we need these fitlers yet
                    
                    <div className="filter-container team-filter">
                        <h3>Team</h3>
                        <input type="text" placeholder="Team" />
                    </div>

                    <div className="filter-container subset-filter">
                        <h3>Subset</h3>
                        <input type="text" placeholder="Subset" />
                    </div> 
                    
                    */}
                </div>
                <div className="shop-listings">
                    <div className="shop-config">
                        <div className="showing">
                            <span>Showing 1 - {`${paginationSize} of ${cards.length} cards`}</span>
                            <span style={{ marginLeft: 20 }}>
                                Show:{" "}
                                <select
                                    name="view-sizes"
                                    onChange={handleChangePaginationSize}
                                    value={paginationSize}
                                >
                                    {PAGINATION_SIZES.map((vs) => (
                                        <option key={`view-size-${vs}`} value={vs}>
                                            {vs}
                                        </option>
                                    ))}
                                </select>
                            </span>
                        </div>
                        <div className="sort">
                            Sort:{" "}
                            <select
                                name="sort-types"
                                onChange={handleChangeSortType}
                                value={sortType}
                            >
                                {SORT_TYPES.map((st) => (
                                    <option key={`sort-type-${st.value}`} value={st.value}>
                                        {st.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="shop-items">
                        {filteredAndSortedCards.slice(0, paginationSize).map((card, i) => (
                            <Card
                                key={`${card.title.toLowerCase()}_${i}`}
                                card={card}
                                isInCart={!!cart[card.sku]}
                                addItemToCart={addItemToCart}
                                removeItemFromCart={removeItemFromCart}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
