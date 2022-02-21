import ShopifyBuy from "shopify-buy/index.unoptimized.umd";
import { MAX_SELECTABLE_PRICE_RANGE } from "../pages/shop/utils";
import { translatePaginatedSearchWithFiltersResponse } from "./utils";

export const API = ShopifyBuy.buildClient({
    domain: "kens-sports-kards.myshopify.com",
    storefrontAccessToken: "===ACCESS TOKEN HERE===",
});

export const UI = window.ShopifyBuy.UI.init(API);

const SORT_KEY_DEF = API.graphQLClient.variable("sortKey", "ProductSortKeys");

const createGraphqlQuery = (args) => {
    return API.graphQLClient.query([SORT_KEY_DEF], (root) => {
        root.addConnection("products", { args }, (products) => {
            products.add("title");
            products.add("tags");
            products.add(
                "variants",
                {
                    args: {
                        first: 1,
                    },
                },
                (variants) => {
                    variants.add("pageInfo", (pageInfo) => {
                        pageInfo.add("hasNextPage");
                        pageInfo.add("hasPreviousPage");
                    });
                    variants.add("edges", (edges) => {
                        edges.add("cursor");
                        edges.add("node", (node) => {
                            node.add("priceV2", (price) => {
                                price.add("amount");
                            });
                            node.add("availableForSale");
                            node.add("image", (image) => {
                                image.add("url");
                                image.add("altText");
                                image.add("height");
                                image.add("width");
                            });
                        });
                    });
                }
            );
        });
    });
};

const getQueryFilterString = (searchFilter, sportFilter, priceRangeFilter, yearFilter) => {
    let queryComponents = [];

    if (searchFilter) {
        queryComponents.push(searchFilter);
    }

    if (sportFilter) {
        queryComponents.push(`tag:${sportFilter}`);
    }

    if (priceRangeFilter && priceRangeFilter.length > 0) {
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
}) => {
    let query = getQueryFilterString(searchFilter, sportFilter, priceRangeFilter, yearFilter);
    let args = { first: pageSize, sortKey: SORT_KEY_DEF };

    if (query) {
        args["query"] = query;
    }

    if (cursor) {
        args["after"] = cursor;
    }

    if (reverse) {
        args["reverse"] = reverse;
    }

    console.log("query: ", query);
    console.log("args: ", args);

    let graphqlQuery = createGraphqlQuery(args);

    return API.graphQLClient
        .send(graphqlQuery, { sortKey: sortKey })
        .then(translatePaginatedSearchWithFiltersResponse);
};
