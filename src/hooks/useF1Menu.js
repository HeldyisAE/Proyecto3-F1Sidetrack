// src/hooks/useF1Menu.js
import { useState } from 'react';
import * as f1Service from '../services/f1Service'; // Importas todo el servicio

export const useF1Menu = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleConsult = async (serviceName, params = null) => {
        setLoading(true);
        setError(null);
        try {
            const result = await f1Service[serviceName](params);
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, handleConsult };
};