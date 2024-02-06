import axios from 'axios';
const url = '/'

export default class UserAPI {
    static async login(user){
        const res = await axios.post(url, user);
        return res.data;
    }

    static async signUp(user){
        const res = await axios.post(url + 'signUp', user);
        return res.data;
    }

    static async fetchAnnouncements(){
        const res = await axios.get(url + 'announcement');
        return res.data;
    }

    static async createReport(report){
        const res = await axios.post(url + 'report', report);
        return res.data;
    }

    static async manageAccount(user){
        const res = await axios.patch(url + 'manageAccount', user);
        return res.data;
    }

    

}