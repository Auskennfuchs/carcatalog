import express from 'express'
import Car from '../models/car'

const router = express.Router()

const fieldNames = {
    "type": "Fahrzeugtyp",
    "name": "Typbezeichnung",
    "manufacture": "Hersteller",
    "series": "Reihe",
    "model": "Modell",
    "shape": "Karosserieform",
    "codes.manufacture": "Herstellercode",
    "constructionTime.from": "Bauzeitraum von",
    "constructionTime.to": "Bauzeitraum bis",
    "basePrice": "Preisempfehlung",
    "engine.type": "Motor",
    "engine.power.ps": "PS",
    "engine.power.kw": "kW",
    "engine.power.rpm": "Umdrehungen/min",
    "engine.cylinder": "Zylinderanordnung/-zahl",
    "engine.capacity": "Hubraum",
    "engine.drive": "Antrieb",
    "engine.maxSpeed": "Höchstgeschwindigkeit",
}

const grouping = {
    "common": {
        name: "",
        fields: [
            "name", "type",
            "manufacture", {
                "constructionTime": [
                    "constructionTime.from", "constructionTime.to"
                ]
            },
            "series", "basePrice",
            "engine.cylinder", "engine.capacity",
        ]
    },
    "engine": {
        name: "Motordaten",
        fields: [
            "engine.type",
            {
                "power": [
                    "engine.power.ps", "engine.power.kw", "engine.power.rpm"
                ]
            },
            "engine.drive", "engine.maxSpeed"
        ]
    }
}

router.use((req, res, next) => {
    console.log('schema')
    next()
})

function mapField(fields, key) {
    const field = fields[key]
    return {
        field: field.path,
        label: fieldNames[field.path],
        required: !!field.isRequired,
        type: field.instance,
        enumValues: (!!field.enumValues && field.enumValues.length > 0 ? field.enumValues : null),
    }
}

router.route("/cars")
    .get((req, res) => {
        const car = new Car()
        const fields = car.schema.paths
        const schema = Object.keys(fields).map(key => mapField(fields, key))
        res.status(200).jsonp({ schema, grouping })
    })

export default router
