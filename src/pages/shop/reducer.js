export const NEW_SEARCH_FETCH_START = "NEW_SEARCH_FETCH_START";
export const FETCH_MORE_START = "FETCH_MORE_START";
export const FETCH_END = "FETCH_END";
export const SHOW_LOADING_INDICATOR = "SHOW_LOADING_INDICATOR";
export const UPDATE_SEARCH_CRITERIA = "UPDATE_SEARCH_CRITERIA";

export function shopReducer(state, action) {
    switch (action.type) {
        case UPDATE_SEARCH_CRITERIA:
            return {
                ...state,
                [action.payload.fetchCriteria]: action.payload.value,
            };
        case SHOW_LOADING_INDICATOR:
            return {
                ...state,
                showLoadingIndicator: true,
            };
        case NEW_SEARCH_FETCH_START:
            return {
                ...state,
                fetching: true,
                cards: [],
                lastCursor: null,
            };
        case FETCH_MORE_START:
            return {
                ...state,
                fetching: true,
            };
        case FETCH_END:
            return {
                ...state,
                fetching: false,
                showLoadingIndicator: false,
                cards: action.payload.cards,
                hasNextPage: action.payload.hasNextPage,
                lastCursor: action.payload.lastCursor,
            };
        default:
            return {
                ...state,
                ...action.payload,
            };
    }
}
