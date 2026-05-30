import { useState, useCallback } from 'react';
import * as f1Service from '../services/f1Service';

export const useF1Menu = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [activeView, setActiveView] = useState(null);

    const handleConsult = useCallback(async (serviceName, params = null) => {
        if (activeView === serviceName) {
            setActiveView(null);
            setData(null);
            setError(null);
            return;
        }

        setLoading(true);
        setError(null);
        setData(null);
        setActiveView(serviceName);

        try {
            const result = params
                ? await f1Service[serviceName](params)
                : await f1Service[serviceName]();
            setData(result);
        } catch (err) {
            setError(err.message ?? 'Error desconocido al consultar la API.');
        } finally {
            setLoading(false);
        }
    }, [activeView]);

    const clearView = useCallback(() => {
        setData(null);
        setError(null);
        setActiveView(null);
    }, []);

    return {
        data,
        loading,
        error,
        activeView, 
        handleConsult,
        clearView,
    };
};