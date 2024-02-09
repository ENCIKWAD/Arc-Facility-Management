import axios from 'axios'
const url = '/admin'

export default class AdminAPI{
    static async getReports(){
        const res = await axios.get(url + '/inbox')
        return res.data
    }

    static async fetchAnnouncement(){
        const res = await axios.get(url + '/manageAnnouncement');
        return res.data;
    }

    static async createAnnouncement(announcement){
        const res = await axios.post(url + '/manageAnnouncement/addAnnouncement', announcement);
        return res.data;
    }

    static async getAnnouncementById(id){
        const res = await axios.get(url + '/manageAnnouncement/' + id);
        return res.data;
    }

    static async editAnnouncement(id, announcement){
        const res = await axios.patch(url + '/manageAnnouncement/editAnnouncement/' + id, announcement);
        return res.data;
    }

    static async deleteAnnouncement(id){
        const res = await axios.delete(url + '/manageAnnouncement/deleteAnnouncement/' + id);
        return res.data;
    }

    static async getUserById(id){
        const res = await axios.post(url + '/inbox', {id: id})
        return res.data
    }

    static async getFacilityById(id){
        const res = await axios.post(url + '/inbox/facility', {id: id})
        return res.data
    }

    static async deleteReport(id){
        const res = await axios.delete(url + '/inbox/' + id)
        return r
        es.data
    }

    static async fetchTenants(){
        const res = await axios.get(url + '/manageTenant');
        return res.data;
    }

    static async updateTenant(id, update) {
        try {
            const response = await axios.patch(`/admin/manageTenant/${id}`, update);
            return response.data;
          } catch (error) {
            throw error;
          }
      }

    static async sort(sort){
        const newSort = {sort: sort}
        const res = await axios.post(url + '/manageAnnouncement', newSort);
        return res.data;
    }

    static async search(search){
        const newSearch = {search: search}
        const res = await axios.post(url, newSearch);
        return res.data;
    }
}