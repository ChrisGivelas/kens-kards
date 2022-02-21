export const DEFAULT_DEBOUNCE_TIMEOUT = 1000;

export const debounce = function (callback, wait = DEFAULT_DEBOUNCE_TIMEOUT, immediate = false) {
    let timeout = null;

    return function () {
        const callNow = immediate && !timeout;
        const next = () => callback.apply(this, arguments);

        clearTimeout(timeout);
        timeout = setTimeout(next, wait);

        if (callNow) {
            next();
        }
    };
};
