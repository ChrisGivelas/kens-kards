import { useRef, useEffect, useCallback } from "react";

export const DEFAULT_DEBOUNCE_TIMEOUT = 500;

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

function useIsMounted() {
    const isMountedRef = useRef(true);
    useEffect(() => {
        return () => {
            isMountedRef.current = false;
        };
    }, []);
    return () => isMountedRef.current;
}

export function useDebounce(cb, delay) {
    const inputsRef = useRef(cb);
    const isMounted = useIsMounted();
    const timeoutRef = useRef(null);

    useEffect(() => {
        inputsRef.current = { cb, delay };
    });

    return useCallback(() => {
        const next = () => {
            if (inputsRef.current.delay === delay && isMounted()) {
                inputsRef.current.cb.apply(this, arguments);
            }
        };

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(next, delay);
    }, [delay, isMounted]);
}
