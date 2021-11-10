import React from "react";
import { useLocation } from "react-router";

export const SEARCH_PARAM = "search";
export const SPORT_PARAM = "sport";
export const LOWER_YEAR_PARAM = "lowerYear";
export const UPPER_YEAR_PARAM = "upperYear";

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
