import axios from 'axios';

export const BASE_URL = 'http://localhost:8888'
//export const BASE_URL = 'https://rosenfeldpublishing.com'

export default axios.create({
    baseURL : "http://localhost:8888"
//    baseURL : "https://rosenfeldpublishing.com"
})