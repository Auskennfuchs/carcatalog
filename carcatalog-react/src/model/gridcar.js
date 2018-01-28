import { schema } from "normalizr"

export const carSchema = new schema.Entity("cars", {}, {
    idAttribute: "_id"
})
export const CarListSchema = [carSchema]