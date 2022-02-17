import ShopifyBuy from "shopify-buy";
import { MAX_SELECTABLE_PRICE_RANGE } from "../pages/shop/utils";

export const API = ShopifyBuy.buildClient({
    domain: "kens-sports-kards.myshopify.com",
    storefrontAccessToken: "===ACCESS TOKEN HERE===",
});

export const UI = window.ShopifyBuy.UI.init(API);

const getQueryFilterString = (searchFilter, sportFilter, priceRangeFilter) => {
    let queryComponents = [];

    if (searchFilter) {
        queryComponents.push(searchFilter);
    }

    if (sportFilter) {
        queryComponents.push(`tag:${sportFilter}`);
    }

    if (priceRangeFilter) {
        if (priceRangeFilter[0] > 0) {
            queryComponents.push(`variants.price:>${priceRangeFilter[0]}`);
        }
        if (priceRangeFilter[1] < MAX_SELECTABLE_PRICE_RANGE) {
            queryComponents.push(`variants.price:<${priceRangeFilter[1]}`);
        }
    }

    return queryComponents.join(" AND ");
};

export const paginatedSearchWithFilters = ({
    sportFilter = null,
    priceRangeFilter = null,
    yearFilter = null,
    searchFilter = null,
    pageSize = 10,
    sortKey = "TITLE",
    reverse = false,
    cursor = null,
    callback = null,
}) => {
    let query = getQueryFilterString(searchFilter, sportFilter, priceRangeFilter);
    let args = { first: pageSize, sortKey, reverse };

    if (query) {
        args["query"] = query;
    }

    if (cursor) {
        args["after"] = cursor;
    }

    console.log("query: ", query);
    console.log("args: ", args);

    if (callback) {
        return API.product.fetchQuery(args).then(callback).catch(console.log);
    } else {
        return API.product.fetchQuery(args);
    }
};
