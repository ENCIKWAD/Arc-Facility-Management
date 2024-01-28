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

    static async editFacility(id, facility){
        const res = await axios.patch(url+ '/editFacility/' + id, facility);
        return res.data;
    }

    static async deleteFacility(id){
        const res = await axios.delete(url + "/deleteFacility/" + id);
        return res.data;
    }

    static async search(search){
        const newSearch = {search: search}
        const res = await axios.post(url, newSearch);
        return res.data;
    }

    static async sort(sort){
        const newSort = {sort: sort}
        const res = await axios.post(url + '/manageFacility', newSort);
        return res.data;
    }



}