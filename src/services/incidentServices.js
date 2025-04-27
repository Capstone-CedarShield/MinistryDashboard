import apiClient from '../config/axiosInstance';

//get all incidents
const getIncidents = async () => {
    try {
        const response = await apiClient.get('/api/incidents');
        return response.data;
    } catch (error) {
        throw error;
    }
};
const getTodayIncidents = async () => {
    try {
        const response = await apiClient.get('/api/incidents/today');
        return response.data;
    } catch (error) {
        throw error;
    }
};

//get a single incident
const getIncident = async (id) => {
    try {
        const response = await apiClient.get(`/api/incidents/all/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

//verify incident
const verifyIncident = async (id) => {
    try {
        const response = await apiClient.put(`/api/incidents/${id}/verify`);
        return response.data;
    } catch (error) {
        throw error;
    }
};


export { getIncidents, getIncident, verifyIncident,getTodayIncidents };