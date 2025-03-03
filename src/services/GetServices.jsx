// Axious API services, in this project we have only get 

import axios from "axios";

const api = axios.create({
    baseURL: 'baseUrl/firstHalf',

})

export const getItem = ()=>{
    return api.get('/secondHalf-of-the-url');
}