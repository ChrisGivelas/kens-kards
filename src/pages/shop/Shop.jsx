import React, { useReducer, useState, useEffect } from "react";
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
    LOWER_YEAR_PARAM,
    UPPER_YEAR_PARAM,
    SEARCH_PARAM,
    SPORT_PARAM,
    useQueryParams,
} from "./utils";
import { useDebounce } from "../../utils";
import { paginatedSearchWithFilters } from "../../shopify/shopifyServices";
import {
    shopReducer,
    NEW_SEARCH_FETCH_START,
    FETCH_END,
    FETCH_MORE_START,
    SHOW_LOADING_INDICATOR,
    UPDATE_SEARCH_CRITERIA,
} from "./reducer";
import Spinner from "../../components/Spinner";

const Shop = () => {
    const queryParams = useQueryParams();
    const staringYearRange = getStartingYearRangeWithDefault(
        queryParams.get(LOWER_YEAR_PARAM),
        queryParams.get(UPPER_YEAR_PARAM)
    );

    const [state, dispatch] = useReducer(shopReducer, {
        showLoadingIndicator: true,
        fetching: true,
        cards: [],
        lastCursor: null,
        hasNextPage: false,
        yearFilter: staringYearRange,
        searchFilter: queryParams.get(SEARCH_PARAM),
        sportFilter: queryParams.get(SPORT_PARAM),
        priceRangeFilter: DEFAULT_PRICE_RANGE,
        paginationSize: PAGINATION_SIZES[0],
        sortType: SORT_TYPES[0].value,
    });

    const {
        showLoadingIndicator,
        fetching,
        cards,
        lastCursor,
        hasNextPage,
        yearFilter,
        searchFilter,
        sportFilter,
        priceRangeFilter,
        paginationSize,
        sortType,
    } = state;

    const [priceRangeFilterText, setPriceRangeFilterText] = useState(priceRangeFilter);
    const [yearFilterText, setYearFilterText] = useState(yearFilter);
    const [sportFilterText, setSportFilterText] = useState(sportFilter);
    const [searchFilterText, setSearchFilterText] = useState(searchFilter);

    const newSearchFetchStart = useDebounce(() => {
        dispatch({ type: NEW_SEARCH_FETCH_START });
    }, 1000);

    const updateSearchCriteria = (fetchCriteria, value) => {
        dispatch({ type: UPDATE_SEARCH_CRITERIA, payload: { fetchCriteria, value } });
        newSearchFetchStart();
    };

    const loadingIndicator = () => {
        dispatch({ type: SHOW_LOADING_INDICATOR });
    };

    const handleShowMore = () => {
        dispatch({ type: FETCH_MORE_START });
    };

    const handleFilterSearch = (e) => {
        loadingIndicator();
        setSearchFilterText(e.target.value);
        updateSearchCriteria("searchFilter", e.target.value);
    };

    const handleFilterSport = (e) => {
        e.stopPropagation();
        loadingIndicator();
        if (sportFilter === e.target.innerText) {
            setSportFilterText(null);
            updateSearchCriteria("sportFilter", null);
        } else {
            setSportFilterText(e.target.innerText);
            updateSearchCriteria("sportFilter", e.target.innerText);
        }
    };

    const handleFilterPriceRange = (priceRange) => {
        updateSearchCriteria("priceRangeFilter", priceRange);
    };

    const handleFilterPriceRangeText = (priceRange) => {
        loadingIndicator();
        setPriceRangeFilterText(priceRange);
    };

    const handleFilterYear = (year) => {
        updateSearchCriteria("yearFilter", year);
    };

    const handleFilterYearText = (year) => {
        loadingIndicator();
        setYearFilterText(year);
    };

    const handleChangePaginationSize = (e) => {
        loadingIndicator();
        updateSearchCriteria("paginationSize", e.target.value);
    };

    const handleChangeSortType = (e) => {
        loadingIndicator();
        e.stopPropagation();
        updateSearchCriteria("sortType", e.target.value);
    };

    useEffect(() => {
        if (fetching) {
            console.log(state);
            paginatedSearchWithFilters({
                sportFilter,
                priceRangeFilter,
                yearFilter,
                searchFilter,
                pageSize: Number(paginationSize),
                sortKey: SHOPIFY_SORT_MAPPING[sortType].sortKey,
                reverse: SHOPIFY_SORT_MAPPING[sortType].reverse,
                cursor: lastCursor,
            }).then((response) => {
                dispatch({
                    type: FETCH_END,
                    payload: {
                        cards: [...cards, ...response.cards],
                        hasNextPage: response.hasNextPage,
                        lastCursor: response.lastCursor,
                    },
                });
            });
        }
    }, [
        cards,
        lastCursor,
        sportFilter,
        priceRangeFilter,
        yearFilter,
        searchFilter,
        paginationSize,
        sortType,
        fetching,
        state,
    ]);

    // console.log(cards);

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
                            className={
                                searchFilterText !== null && searchFilterText.length > 0
                                    ? "has-value"
                                    : null
                            }
                        />
                    </div>

                    <div className="filter-container sport-filter">
                        <h3>Sport</h3>
                        <RadioList
                            currentSelection={sportFilterText}
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
                    <div className="shop-results-container">
                        {showLoadingIndicator ? (
                            <div className="loading-container">
                                <Spinner />
                            </div>
                        ) : (
                            <>
                                <div className="shop-items">
                                    {cards.map((card, i) => (
                                        <Card
                                            key={`${card.title.toLowerCase()}_${i}`}
                                            card={card}
                                        />
                                    ))}
                                </div>
                                {hasNextPage ? (
                                    <div className="show-more">
                                        {fetching ? (
                                            <Spinner />
                                        ) : (
                                            <input
                                                type="button"
                                                value="Show More"
                                                onClick={handleShowMore}
                                            />
                                        )}
                                    </div>
                                ) : (
                                    <div className="no-more">
                                        <p>
                                            There are no more cards to show. Try changing the
                                            filters to see new results.
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shop;
