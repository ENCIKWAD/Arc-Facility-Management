import axios from 'axios';
const url = '/tenant'

export default class TenantAPI{
    static async fetchFacilities(){
        const res = await axios.get(url);
        return res.data;
    }

    static async search(search){
        const newSearch = {search: search}
        const res = await axios.post(url, newSearch);
        return res.data;
    }
}