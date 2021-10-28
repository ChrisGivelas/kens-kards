import testCardsInfo from "../../sandbox/testCards";

export const PAGINATION_SIZES = [10, 20, 50, 100];
export const defaultPriceRange = [0, 1000];
export const defaultUpperPriceRange = 10000;

const isYearRange = (year) => year.split("-").length > 1;
const getYearRange = (years) => years.split("-");
const getLowerYear = (years) => years.split("-")[0];
const getUpperYear = (years) => years.split("-")[1];

export const defaultYearOptions = testCardsInfo.reduce((agg, card) => {
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

export const defaultLowerYearRange = Math.floor(Math.min(...defaultYearOptions) / 10) * 10;
export const defaultUpperYearRange = Math.ceil(Math.max(...defaultYearOptions) / 10) * 10;
export const defaultYearRange = [defaultLowerYearRange, defaultUpperYearRange];

export const generateCardSorter = (sortOrder) => {
    let [sortType, sortDirection] = sortOrder.split(" ");
    if (sortType === "ALPHA") {
        if (sortDirection === "ASC") {
            return (a, b) => {
                var nameA = a.info.title.toUpperCase();
                var nameB = b.info.title.toUpperCase();
                return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
            };
        } else {
            return (a, b) => {
                var nameA = a.info.title.toUpperCase();
                var nameB = b.info.title.toUpperCase();
                return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
            };
        }
    } else if (sortType === "PRICE") {
        if (sortDirection === "ASC") {
            return (a, b) => a.info.price - b.info.price;
        } else {
            return (a, b) => b.info.price - a.info.price;
        }
    } else if (sortType === "YEAR") {
        if (sortDirection === "ASC") {
            return (a, b) => {
                if (isYearRange(a.info.year)) {
                    if (isYearRange(b.info.year)) {
                        let comp1 = getLowerYear(a.info.year) - getLowerYear(b.info.year);
                        if (comp1 === 0) {
                            let comp2 = getUpperYear(a.info.year) - getUpperYear(b.info.year);
                            if (comp2 === 0) {
                                return 1;
                            }
                        } else {
                            return comp1;
                        }
                    } else {
                        let comp1 = getLowerYear(a.info.year) - b.info.year;
                        if (comp1 === 0) {
                            return 1;
                        } else {
                            return comp1;
                        }
                    }
                } else if (isYearRange(b.info.year)) {
                    let comp1 = a.info.year - getLowerYear(b.info.year);
                    if (comp1 === 0) {
                        return -1;
                    } else {
                        return comp1;
                    }
                } else {
                    return a.info.year - b.info.year;
                }
            };
        } else {
            return (a, b) => {
                if (isYearRange(b.info.year)) {
                    if (isYearRange(a.info.year)) {
                        let comp1 = getUpperYear(b.info.year) - getUpperYear(a.info.year);
                        if (comp1 === 0) {
                            let comp2 = getLowerYear(b.info.year) - getLowerYear(a.info.year);
                            if (comp2 === 0) {
                                return -1;
                            } else {
                                return comp2;
                            }
                        } else {
                            return comp1;
                        }
                    } else {
                        let comp1 = getUpperYear(b.info.year) - a.info.year;
                        if (comp1 === 0) {
                            return -1;
                        } else {
                            return comp1;
                        }
                    }
                } else if (isYearRange(a.info.year)) {
                    let comp1 = b.info.year - getUpperYear(a.info.year);
                    if (comp1 === 0) {
                        return 1;
                    } else {
                        return comp1;
                    }
                } else {
                    return b.info.year - a.info.year;
                }
            };
        }
    }
};

export const generateCardFilters = (sportFilter, priceRangeFilter, yearFilter) => {
    return (card) => {
        console.log(card.info);

        let sport = sportFilter === null || card.info.sport === sportFilter;

        let price =
            card.info.price >= priceRangeFilter[0] &&
            (priceRangeFilter[1] === defaultUpperPriceRange ||
                card.info.price <= priceRangeFilter[1]);

        var year = undefined;

        if (card.info.year.split("-").length > 1) {
            let [year1, year2] = card.info.year.split("-");

            year =
                (year1 >= yearFilter[0] && year1 <= yearFilter[1]) ||
                (year2 >= yearFilter[0] && year2 <= yearFilter[1]);
        } else {
            year = card.info.year >= yearFilter[0] && card.info.year <= yearFilter[1];
        }

        return sport && price && year;
    };
};
