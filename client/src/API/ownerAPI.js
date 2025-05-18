// src/services/OwnerAPI.js
import api from './api';
const url = '/owner';

export default class OwnerAPI {
    static async fetchFacilities() {
        const res = await api.get(url);
        return res.data;
    }

    static async addFacility(facility) {
        const res = await api.post(`${url}/addFacility`, facility);
        return res.data;
    }

    static async getFacilityById(id) {
        const res = await api.get(`${url}/facility/${id}`);
        return res.data;
    }

    static async editFacility(id, facility) {
        const res = await api.patch(`${url}/editFacility/${id}`, facility);
        return res.data;
    }

    static async deleteFacility(id) {
        const res = await api.delete(`${url}/deleteFacility/${id}`);
        return res.data;
    }

    static async search(search) {
        const res = await api.post(url, { search });
        return res.data;
    }

    static async sort(sort) {
        const res = await api.post(`${url}/manageFacility`, { sort });
        return res.data;
    }

    static async getTenants() {
        const res = await api.get(`${url}/report`);
        return res.data;
    }

    static async fetchRequests() {
        const res = await api.get(`${url}/inbox`);
        return res.data;
    }

    static async editRequest(request) {
        const res = await api.post(`${url}/inbox`, request);
        return res.data;
    }
}