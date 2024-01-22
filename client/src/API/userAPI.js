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

}