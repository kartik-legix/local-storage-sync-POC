import { useEffect, useState } from "react";

const useLocalSync = <T,>(key: string, initialValue: T): [T, (value: T) => void] => {
    const [value, setValue] = useState<T>(() => {
        return initialValue;
    });

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === key && event.newValue !== null) {
                try {
                    setValue(JSON.parse(event.newValue) as T);
                    console.log(`${key} updated`, event.newValue);
                } catch (error) {
                    console.error(`Error parsing localStorage value for key "${key}":`, error);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [key]);

    const updateValue = (newValue: T) => {
        try {
            const valueToStore = JSON.stringify(newValue);
            localStorage.setItem(key, valueToStore);

            // Dispatch custom storage event to sync within the same tab
            window.dispatchEvent(
                new StorageEvent("storage", {
                    key,
                    newValue: valueToStore,
                    storageArea: localStorage,
                })
            );

            setValue(newValue);
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    };

    return [value, updateValue];
};

export default useLocalSync;
