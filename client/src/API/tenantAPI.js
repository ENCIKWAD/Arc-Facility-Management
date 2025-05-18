// src/services/TenantAPI.js
import api from './api';
const url = '/tenant';

export default class TenantAPI {
    static async fetchFacilities() {
        const res = await api.get(url);
        return res.data;
    }

    static async search(search) {
        const res = await api.post(url, { search });
        return res.data;
    }

    static async createRequest(id, request) {
        const res = await api.post(`${url}/lease/${id}`, request);
        return res.data;
    }

    static async fetchRequests(id) {
        const res = await api.post(`${url}/inbox`, { tenantId: id });
        return res.data;
    }
}