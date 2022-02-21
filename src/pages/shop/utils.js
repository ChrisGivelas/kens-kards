import React from "react";
import { useLocation } from "react-router";

export const SEARCH_PARAM = "search";
export const SPORT_PARAM = "sport";
export const LOWER_YEAR_PARAM = "lowerYear";
export const UPPER_YEAR_PARAM = "upperYear";

export const PAGINATION_SIZES = [10, 20, 50, 100];
export const SORT_TYPES = [
    { value: "ALPHA ASC", label: "Alphabetical Ascending" },
    { value: "ALPHA DESC", label: "Alphabetical Descending" },
    { value: "PRICE ASC", label: "Price - Lowest to Highest" },
    { value: "PRICE DESC", label: "Price - Highest to Lowest" },
];
export const SHOPIFY_SORT_MAPPING = {
    "ALPHA ASC": { sortKey: "TITLE", reverse: false },
    "ALPHA DESC": { sortKey: "TITLE", reverse: true },
    "PRICE ASC": { sortKey: "PRICE", reverse: false },
    "PRICE DESC": { sortKey: "PRICE", reverse: true },
};
export const MAX_SELECTABLE_PRICE_RANGE = 10000;
export const DEFAULT_PRICE_RANGE = [0, MAX_SELECTABLE_PRICE_RANGE];

export const DEFAULT_LOWER_YEAR_RANGE = 1880;
export const DEFAULT_UPPER_YEAR_RANGE = new Date().getFullYear();
export const DEFAULT_LOWER_YEAR_FILTER = DEFAULT_LOWER_YEAR_RANGE;
export const DEFAULT_UPPER_YEAR_FILTER = DEFAULT_UPPER_YEAR_RANGE;

export const DEFAULT_SPORT_OPTIONS = ["Baseball", "Basketball", "Hockey", "Football"];

export const getCardTitleString = (card) =>
    isNaN(parseInt(card.title.substring(0, 4))) ? card.year + " " + card.title : card.title;

export const getStartingYearRangeWithDefault = (lower, upper) => {
    var l;
    var u;

    if (!!lower) {
        l = lower;
    } else {
        l = DEFAULT_LOWER_YEAR_FILTER;
    }

    if (!!upper) {
        u = upper;
    } else {
        u = DEFAULT_UPPER_YEAR_FILTER;
    }

    return [l, u];
};

export const useQueryParams = () => {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
};

export const buildQueryParamString = ({ cardSearch, sport, lowerYear, upperYear }) => {
    let newQueryParams = new URLSearchParams();

    if (!!cardSearch) {
        newQueryParams.append(SEARCH_PARAM, cardSearch);
    }

    if (!!sport) {
        newQueryParams.append(SPORT_PARAM, sport);
    }

    if (!!lowerYear) {
        newQueryParams.append(LOWER_YEAR_PARAM, lowerYear);
    }

    if (!!upperYear) {
        newQueryParams.append(UPPER_YEAR_PARAM, upperYear);
    }

    return newQueryParams.toString();
};
