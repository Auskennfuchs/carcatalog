import api from '../api'

export const create = (cardata, token) => () => (
    api(token).car.create(cardata)
)

export const save = (cardata, token) => () => (
    api(token).car.save(cardata)
)

export const edit = (cardata, token) => () => (
    api(token).car.create(cardata)
)

export const fetchAll = (token) => () => (
    api(token).car.fetchAll()
)

export const getCar = (id, token) => () => {
    return api(token).car.get(id)
}