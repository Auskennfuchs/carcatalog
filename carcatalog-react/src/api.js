import axios from 'axios'

export default {
    car: {
        create: (cardata) => (
            axios.post('/api/cars', cardata).then(res => res.data)
        ),
        save: (cardata) => (
            axios.put('/api/cars/'.concat(cardata._id), cardata).then(res => res.data)
        ),
        fetchAll: () => (
            axios.get("/api/cars").then(res => res.data)
        ),
        get: (id) => (
            axios.get("/api/cars/".concat(id)).then(res => res.data)
        ),
        schema: () => (
            axios.get("/schema/cars").then(res => res.data)
        )
    }
}