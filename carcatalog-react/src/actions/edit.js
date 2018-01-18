import api from '../api'

export const create = (cardata) => () => (
    api.car.create(cardata)
)

export const edit = (cardata) => () => (
    api.car.create(cardata)
)

export const fetchAll = () => () => (
    api.car.fetchAll()
)