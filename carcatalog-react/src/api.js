import axios from 'axios'

export default {
    car: {        
        create: (cardata) => {
            console.log("create")
            return axios.post('/api/cars',cardata).then(res => res.data)
        },
        fetchAll: () => {
            console.log("fetchAll")
            return axios.get("/api/cars").then(res=>res.data)
        }
    }
}