export const PAGINATION_SIZES = [10, 20, 50, 100];
export const defaultPriceRange = [0, 1000];
export const defaultUpperPriceRange = 10000;

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
    }
};

export const generateCardFilters = (sportFilter, priceRangeFilter) => {
    return (card) => {
        return (
            (sportFilter === null || card.info.sport === sportFilter) &&
            card.info.price >= priceRangeFilter[0] &&
            (priceRangeFilter[1] === defaultUpperPriceRange ||
                card.info.price <= priceRangeFilter[1])
        );
    };
};
