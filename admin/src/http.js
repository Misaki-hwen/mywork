import axios from 'axios'
const http = axios.create({
baseURL:'http://localhost:7001/'

})

export default http