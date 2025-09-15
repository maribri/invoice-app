import { useState, useCallback } from 'react';

function getValue<T>(key: string, initialValue: T | (() => T)): T {
    try {
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null) {
            return JSON.parse(savedValue);
        }
    } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        localStorage.removeItem(key);
    }

    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
}

export function useLocalStorage<T>(
    key: string,
    initialValue: T | (() => T),
    debug = false
) {
    const [value, setValue] = useState<T>(() => getValue(key, initialValue));

    const setStoredValue = useCallback(
        (newValue: T | ((prev: T) => T)) => {
            setValue(prev => {
                const valueToStore =
                    newValue instanceof Function ? newValue(prev) : newValue;

                try {
                    localStorage.setItem(key, JSON.stringify(valueToStore));
                    if (debug) console.log(`Updated localStorage key "${key}" successfully.`);
                } catch (error) {
                    console.error(`Error writing to localStorage key "${key}":`, error);
                }

                return valueToStore;
            });
        },
        [key, debug]
    );

    return [value, setStoredValue] as const;
}
