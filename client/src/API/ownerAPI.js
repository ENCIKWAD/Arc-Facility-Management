import axios from 'axios';
const url = '/owner'

export default class OwnerAPI{
    static async fetchFacilities(){
        const res = await axios.get(url);
        return res.data;
    }

    static async addFacility(facility){
        const res = await axios.post(url + "/addFacility", facility);
        return res.data;
    }

    static async getFacilityById(id){
        const res = await axios.get(url + "/facility/" + id);
        return res.data;
    }
}