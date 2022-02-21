export const NEW_SEARCH_FETCH_START = "NEW_SEARCH_FETCH_START";
export const FETCH_MORE_START = "FETCH_MORE_START";
export const FETCH_END = "FETCH_END";

export function shopReducer(state, action) {
    switch (action.type) {
        case NEW_SEARCH_FETCH_START:
            return {
                ...state,
                loading: true,
                [action.payload.fetchCriteria]: action.payload.value,
                cards: [],
                lastCursor: null,
            };
        case FETCH_MORE_START:
            return {
                ...state,
                loading: true,
            };
        case FETCH_END:
            return {
                ...state,
                loading: false,
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
