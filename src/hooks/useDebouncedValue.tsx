/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';

export const useDebouncedValue = (input: string = '', time: number = 500 ) => {
    const [deBouncedValue, setDeBouncedValue] = useState(input);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDeBouncedValue(input);
        }, time);

        return () => {
            clearTimeout( timeout );
        };

    }, [input]);

    return deBouncedValue;
};
