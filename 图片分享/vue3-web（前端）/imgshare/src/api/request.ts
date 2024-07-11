import axios from 'axios'

axios.defaults.baseURL = '/api'

axios.get('getCount').then((va)=>{
    console.log(va)
})

export const request = axios