// src/services/f1Service.js
const API_URL = "https://api.openf1.org/v1";

// Función centralizada para peticiones
const request = async (endpoint) => {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) throw new Error(`Error en ${endpoint}`);
    return await response.json();
};

// Endpoints necesarios según tu diagrama modular [cite: 261]
export const getDrivers = () => request("drivers");
export const getTeams = () => request("teams");
export const getResults = (sessionKey) => request(`sessions?session_key=${sessionKey}`);