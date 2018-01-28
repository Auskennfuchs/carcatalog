import api from '../api'

export const create = (cardata) => () => (
    api.car.create(cardata)
)

export const save = (cardata) => () => (
    api.car.save(cardata)
)

export const edit = (cardata) => () => (
    api.car.create(cardata)
)

export const fetchAll = () => () => (
    api.car.fetchAll()
)

export const getCar = (id) => () => {
    return api.car.get(id)
}