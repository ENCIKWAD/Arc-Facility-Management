import axios from 'axios'
const url = '/admin'

export default class AdminAPI{
    static async getReports(){
        const res = await axios.get(url + '/inbox')
        return res.data
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
        return res.data
    }
}