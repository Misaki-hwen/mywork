import axios from 'axios'
const http = axios.create({
baseURL:'http://localhost:7002/'

})

export default http