// src/services/AdminAPI.js
import api from './api';
const baseUrl = 'admin'; // No need for process.env here as it's in the api instance

export default class AdminAPI {
    static async getReports() {
        const res = await api.get(`${baseUrl}/inbox`);
        return res.data;
    }

    static async fetchAnnouncement() {
        const res = await api.get(`${baseUrl}/manageAnnouncement`);
        return res.data;
    }

    static async createAnnouncement(announcement) {
        const res = await api.post(`${baseUrl}/manageAnnouncement/addAnnouncement`, announcement);
        return res.data;
    }

    static async getAnnouncementById(id) {
        const res = await api.get(`${baseUrl}/manageAnnouncement/${id}`);
        return res.data;
    }

    static async editAnnouncement(id, announcement) {
        const res = await api.patch(`${baseUrl}/manageAnnouncement/editAnnouncement/${id}`, announcement);
        return res.data;
    }

    static async deleteAnnouncement(id) {
        const res = await api.delete(`${baseUrl}/manageAnnouncement/deleteAnnouncement/${id}`);
        return res.data;
    }

    static async getUserById(id) {
        const res = await api.post(`${baseUrl}/inbox`, { id: id });
        return res.data;
    }

    static async getFacilityById(id) {
        const res = await api.post(`${baseUrl}/inbox/facility`, { id: id });
        return res.data;
    }

    static async deleteReport(id) {
        const res = await api.delete(`${baseUrl}/inbox/${id}`);
        return res.data;
    }

    static async fetchTenants() {
        const res = await api.get(`${baseUrl}/manageTenant`);
        return res.data;
    }

    static async getTenantNameById(id) {
        const res = await api.get(`${baseUrl}/manageTenant/${id}/name`);
        return res.data;
    }

    static async updateTenant(id, update) {
        const res = await api.patch(`${baseUrl}/manageTenant/${id}`, update);
        return res.data;
    }

    static async fetchRequests() {
        const res = await api.get(`${baseUrl}/viewRequest`);
        return res.data;
    }

    static async sort(sort) {
        const res = await api.post(`${baseUrl}/manageAnnouncement`, { sort: sort });
        return res.data;
    }

    static async search(search) {
        const res = await api.post(baseUrl, { search: search });
        return res.data;
    }
}