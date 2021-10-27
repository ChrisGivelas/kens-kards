export const generateCardSorter = (sortType, sortDirection) => {
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
