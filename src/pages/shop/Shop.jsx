import React, { useState } from "react";
import { Range } from "rc-slider";
import Card from "./Card";
import RadioList from "../../components/fields/RadioList";
import {
    PAGINATION_SIZES,
    SORT_TYPES,
    DEFAULT_PRICE_RANGE,
    MAX_SELECTABLE_PRICE_RANGE,
    DEFAULT_LOWER_YEAR_RANGE,
    DEFAULT_UPPER_YEAR_RANGE,
    DEFAULT_SPORT_OPTIONS,
    getStartingYearRangeWithDefault,
    SHOPIFY_SORT_MAPPING,
} from "./utils";
import {
    LOWER_YEAR_PARAM,
    UPPER_YEAR_PARAM,
    SEARCH_PARAM,
    SPORT_PARAM,
    useQueryParams,
    debounce,
} from "../../utils";
import { useEffect } from "react";
import { paginatedSearchWithFilters } from "../../shopify/shopifyServicesUnoptimized";
import { translatePaginatedSearchWithFiltersResponse } from "../../shopify/utils";
import { useCallback } from "react";

const Shop = () => {
    const [lastCursor, setLastCursor] = useState(null);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [nextPageAfter, setNextPageAfter] = useState(null);
    const [cards, setCards] = useState([]);
    const queryParams = useQueryParams();
    const staringYearRange = getStartingYearRangeWithDefault(
        queryParams.get(LOWER_YEAR_PARAM),
        queryParams.get(UPPER_YEAR_PARAM)
    );

    const [paginationSize, setPaginationSize] = useState(PAGINATION_SIZES[0]);
    const [sortType, setSortType] = useState(SORT_TYPES[0].value);

    const [searchFilter, setSearchFilter] = useState(queryParams.get(SEARCH_PARAM));
    const [sportFilter, setSportFilter] = useState(queryParams.get(SPORT_PARAM));
    const [priceRangeFilter, setPriceRangeFilter] = useState(DEFAULT_PRICE_RANGE);
    const [priceRangeFilterText, setPriceRangeFilterText] = useState(DEFAULT_PRICE_RANGE);
    const [yearFilter, setYearFilter] = useState(staringYearRange);
    const [yearFilterText, setYearFilterText] = useState(staringYearRange);

    const resetProductList = useCallback(() => {
        setCards([]);
        setHasNextPage(false);
        setNextPageAfter(null);
    }, [setCards, setHasNextPage, setNextPageAfter]);

    const handleFilterSearch = debounce((e) => {
        resetProductList();
        setSearchFilter(e.target.value);
    });

    const handleFilterSport = debounce((e) => {
        resetProductList();
        e.stopPropagation();
        if (sportFilter === e.target.innerText) {
            setSportFilter(null);
        } else {
            setSportFilter(e.target.innerText);
        }
    });

    const handleFilterPriceRange = debounce((priceRange) => {
        resetProductList();
        setPriceRangeFilter(priceRange);
    });

    const handleFilterPriceRangeText = (priceRange) => {
        setPriceRangeFilterText(priceRange);
    };

    const handleFilterYear = debounce((year) => {
        resetProductList();
        setYearFilter(year);
    });

    const handleFilterYearText = (year) => {
        setYearFilterText(year);
    };

    const handleChangePaginationSize = debounce((e) => {
        resetProductList();
        setPaginationSize(e.target.value);
    });

    const handleChangeSortType = debounce((e) => {
        resetProductList();
        e.stopPropagation();
        setSortType(e.target.value);
    });

    const handleShowMore = () => {
        setNextPageAfter(lastCursor);
    };

    const fetchProducts = useCallback(() => {
        paginatedSearchWithFilters({
            sportFilter,
            priceRangeFilter,
            yearFilter,
            searchFilter,
            pageSize: Number(paginationSize),
            callback: translatePaginatedSearchWithFiltersResponse,
            sortKey: SHOPIFY_SORT_MAPPING[sortType].sortKey,
            reverse: SHOPIFY_SORT_MAPPING[sortType].reverse,
            cursor: nextPageAfter,
        }).then((response) => {
            console.log(response);
            setCards((c) => c.concat(response.cards));
            setHasNextPage(response.hasNextPage);
            setLastCursor(response.lastCursor);
        });
    }, [
        sportFilter,
        priceRangeFilter,
        yearFilter,
        searchFilter,
        paginationSize,
        sortType,
        nextPageAfter,
    ]);

    useEffect(() => {
        if (hasNextPage) {
            fetchProducts();
        }
    }, [
        sportFilter,
        priceRangeFilter,
        yearFilter,
        searchFilter,
        paginationSize,
        sortType,
        nextPageAfter,
        hasNextPage,
        fetchProducts,
    ]);

    console.log(cards);

    return (
        <div className="shop">
            <h1>Shopping Cart</h1>
            <div className="shop-grid">
                <div className="shop-filters">
                    <h2>Filters</h2>

                    <div className="filter-container search-filter">
                        <h3>Card Description</h3>
                        <input
                            type="text"
                            placeholder="Search..."
                            onChange={handleFilterSearch}
                            defaultValue={queryParams.get("search")}
                            style={{ padding: 5 }}
                        />
                    </div>

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
                            step={100}
                            defaultValue={DEFAULT_PRICE_RANGE}
                            allowCross={false}
                            pushable
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
                            defaultValue={staringYearRange}
                            allowCross={false}
                            pushable
                        />
                        <p>{`${yearFilterText[0]} - ${yearFilterText[1]}`}</p>
                    </div>
                </div>
                <div className="shop-listings">
                    <div className="shop-config">
                        <div className="showing">
                            <span>
                                Page Size:{" "}
                                <select name="view-sizes" onChange={handleChangePaginationSize}>
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
                            <select name="sort-types" onChange={handleChangeSortType}>
                                {SORT_TYPES.map((st) => (
                                    <option key={`sort-type-${st.value}`} value={st.value}>
                                        {st.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="shop-items">
                        {cards.map((card, i) => (
                            <Card key={`${card.title.toLowerCase()}_${i}`} card={card} />
                        ))}
                    </div>
                    {hasNextPage ? (
                        <div className="show-more">
                            <input type="button" value="Show More" onClick={handleShowMore} />
                        </div>
                    ) : (
                        <div className="no-more">
                            <p>
                                There are no more cards to show. Try changing filters to alter your
                                search results.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
