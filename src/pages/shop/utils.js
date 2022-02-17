import testCardsInfo from "../../sandbox/testCards";

const isYearRange = (year) => year.split("-").length > 1;
const getYearRange = (years) => years.split("-");
const getLowerYear = (years) => years.split("-")[0];
const getUpperYear = (years) => years.split("-")[1];

export const PAGINATION_SIZES = [10, 20, 50, 100];
export const SORT_TYPES = [
    { value: "ALPHA ASC", label: "Alphabetical Ascending" },
    { value: "ALPHA DESC", label: "Alphabetical Descending" },
    { value: "PRICE ASC", label: "Price - Lowest to Highest" },
    { value: "PRICE DESC", label: "Price - Highest to Lowest" },
    { value: "YEAR ASC", label: "Year - Lowest to Highest" },
    { value: "YEAR DESC", label: "Year - Highest to Lowest" },
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
export const DEFAULT_YEAR_OPTIONS = testCardsInfo.reduce((agg, card) => {
    if (isYearRange(card.year)) {
        let [year1, year2] = getYearRange(card.year);
        agg.push(year1);
        agg.push(year2);
        return agg;
    } else {
        agg.push(card.year);
        return agg;
    }
}, []);
export const DEFAULT_YEAR_RANGE = [DEFAULT_LOWER_YEAR_RANGE, DEFAULT_UPPER_YEAR_RANGE];
export const DEFAULT_SPORT_OPTIONS = ["Baseball", "Basketball", "Hockey"];

export const generateCardSorter = (sort) => {
    let [sortType, sortDirection] = sort.split(" ");
    if (sortType === "ALPHA") {
        if (sortDirection === "ASC") {
            return (a, b) => {
                var nameA = a.title.toUpperCase();
                var nameB = b.title.toUpperCase();
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            };
        } else {
            return (a, b) => {
                var nameA = a.title.toUpperCase();
                var nameB = b.title.toUpperCase();
                return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
            };
        }
    } else if (sortType === "PRICE") {
        if (sortDirection === "ASC") {
            return (a, b) => a.price - b.price;
        } else {
            return (a, b) => b.price - a.price;
        }
    } else if (sortType === "YEAR") {
        if (sortDirection === "ASC") {
            return (a, b) => {
                if (isYearRange(a.year)) {
                    if (isYearRange(b.year)) {
                        let comp1 = getLowerYear(a.year) - getLowerYear(b.year);
                        if (comp1 === 0) {
                            let comp2 = getUpperYear(a.year) - getUpperYear(b.year);
                            if (comp2 === 0) {
                                return 1;
                            }
                        } else {
                            return comp1;
                        }
                    } else {
                        let comp1 = getLowerYear(a.year) - b.year;
                        if (comp1 === 0) {
                            return 1;
                        } else {
                            return comp1;
                        }
                    }
                } else if (isYearRange(b.year)) {
                    let comp1 = a.year - getLowerYear(b.year);
                    if (comp1 === 0) {
                        return -1;
                    } else {
                        return comp1;
                    }
                } else {
                    return a.year - b.year;
                }
            };
        } else {
            return (a, b) => {
                if (isYearRange(b.year)) {
                    if (isYearRange(a.year)) {
                        let comp1 = getUpperYear(b.year) - getUpperYear(a.year);
                        if (comp1 === 0) {
                            let comp2 = getLowerYear(b.year) - getLowerYear(a.year);
                            if (comp2 === 0) {
                                return -1;
                            } else {
                                return comp2;
                            }
                        } else {
                            return comp1;
                        }
                    } else {
                        let comp1 = getUpperYear(b.year) - a.year;
                        if (comp1 === 0) {
                            return -1;
                        } else {
                            return comp1;
                        }
                    }
                } else if (isYearRange(a.year)) {
                    let comp1 = b.year - getUpperYear(a.year);
                    if (comp1 === 0) {
                        return 1;
                    } else {
                        return comp1;
                    }
                } else {
                    return b.year - a.year;
                }
            };
        }
    }
};

export const generateCardFilters =
    (sportFilter, priceRangeFilter, yearFilter, textSearchFilter) => (card) => {
        let sport = sportFilter === null || card.sport === sportFilter;

        let price =
            card.price >= priceRangeFilter[0] &&
            (priceRangeFilter[1] === MAX_SELECTABLE_PRICE_RANGE ||
                card.price <= priceRangeFilter[1]);

        var year;

        if (isYearRange(card.year)) {
            let [year1, year2] = getYearRange(card.year);

            year =
                (year1 >= yearFilter[0] && year1 <= yearFilter[1]) ||
                (year2 >= yearFilter[0] && year2 <= yearFilter[1]);
        } else {
            year = card.year >= yearFilter[0] && card.year <= yearFilter[1];
        }

        var text = true;

        if (!!textSearchFilter) {
            let wordsToSearchFor = textSearchFilter.split(" ");
            let cardTitle = getCardTitleString(card);

            text = wordsToSearchFor.some(
                (word) => cardTitle.toLowerCase().indexOf(word.toLowerCase()) !== -1
            );
        }

        return sport && price && year && text;
    };

export const getCardTitleString = (card) =>
    isNaN(parseInt(card.title.substring(0, 4))) ? card.year + " " + card.title : card.title;

export const getStartingYearRangeWithDefault = (lower, upper) => {
    var l;
    var u;

    if (!!lower) {
        l = lower;
    } else {
        l = DEFAULT_LOWER_YEAR_RANGE;
    }

    if (!!upper) {
        u = upper;
    } else {
        u = DEFAULT_UPPER_YEAR_RANGE;
    }

    return [l, u];
};
