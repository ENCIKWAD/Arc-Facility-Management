// src/services/UserAPI.js
import api from './api';
const baseUrl = process.env.VUE_APP_API_BASE_URL || '';

export default class UserAPI {
    static async login(user) {
        const res = await api.post(baseUrl, user);
        console.log(res.data);
        return res.data;
    }

    static async signUp(user) {
        const res = await api.post(`${baseUrl}signUp`, user);
        return res.data;
    }

    static async fetchAnnouncements() {
        const res = await api.get(`${baseUrl}announcement`);
        return res.data;
    }

    static async createReport(report) {
        const res = await api.post(`${baseUrl}report`, report);
        return res.data;
    }

    static async manageAccount(user) {
        // If user contains a file upload, we need to handle it differently
        if (user instanceof FormData) {
            const res = await api.patch(`${baseUrl}manageAccount`, user);
            return res.data;
        } else {
            const res = await api.patch(`${baseUrl}manageAccount`, user);
            return res.data;
        }
    }

    static async logout() {
        const res = await api.get(`${baseUrl}logout`);
        return res;
    }

    static async checkAuth(){
        const res = await api.get(`${baseUrl}checkAuth`);
        return res;
    }
}