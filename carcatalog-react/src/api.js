import axios from 'axios'

const API = (token) => ({
    car: {
        create: (cardata) => (
            axios.post(process.env.REACT_APP_URL_CARAPI.concat('/api/cars'), cardata)
                .then(res => res.data)
                .catch(err => Promise.reject(err.response.data))
        ),
        save: (cardata) => (
            axios.put(process.env.REACT_APP_URL_CARAPI.concat('/api/cars/').concat(cardata._id), cardata).then(res => res.data)
        ),
        fetchAll: () => (
            axios.get(process.env.REACT_APP_URL_CARAPI.concat("/api/cars"), { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data)
        ),
        get: (id) => (
            axios.get(process.env.REACT_APP_URL_CARAPI.concat("/api/cars/").concat(id)).then(res => res.data)
        ),
        schema: () => (
            axios.get(process.env.REACT_APP_URL_CARAPI.concat("/schema/cars")).then(res => res.data)
        )
    },
    user: {
        login: (credentials) => (
            axios.post(process.env.REACT_APP_URL_CARAPI.concat('/user/login'), credentials)
                .then(res => res.data)
                .catch(err => Promise.reject(err.response.data))
        )
    }
})

export default API