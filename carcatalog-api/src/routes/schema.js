import express from 'express'
import Car from '../models/car'

const router = express.Router()

const fieldNames = {
    "type": "Fahrzeugtyp",
    "name": "Typbezeichnung",
    "manufacture": "Hersteller",
    "series": "Reihe",
    "model": "Modell",
    "codes.manufacture": "Hersteller-Code",
    "codes.kba.hsn": "KBA-Code HSN",
    "codes.kba.tsn": "TSN",
    "codes.ets": "ETS-Code",
    "codes.dat": "DAT-Code",
    "codes.afb": "afb-Code",
    "basePrice": "Preisempfehlung",
    "constructionTime.from": "Bauzeit von",
    "constructionTime.to": "bis",
    "insurance.liability": "Haftpflichtklasse",
    "insurance.fullCover": "Vollkaskoklasse",
    "insurance.partialCover": "Teilkaskoklasse",
    "shape": "Karosserieform",
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
    "engine.gears": "Gänge",
    "engine.gearType": "Getriebe",
    "engine.fuel": "Kraftstoff",
    "engine.consumption.city": "Verbrauch Stadt",
    "engine.consumption.country": "Land",
    "engine.consumption.combined": "kombiniert",
    "engine.maxSpeed": "Höchstgeschwindigkeit",
    "engine.acc0to100": "Beschleunigung 0-100 km/h",
    "engine.acc80to100": "Elastizität 80-100 km/h",
    "engine.acc80to120": "Elastizität 80-120 km/h",
    "engine.torque.torque": "Drehmoment",
    "engine.torque.rpm": "Umdrehungen/min",
    "engine.noise.still": "Standgeräusch",
    "engine.noise.drive": "Fahrgeräusch",
    "engine.range": "Reichweite",
    "engine.co2Emission": "CO2-Emmision",
    "body.shape": "Aufbau",
    "body.doors": "Türen",
    "body.backType": "Heckart",
    "body.seats": "Sitze",
    "body.tire.front": "Reifen vorne",
    "body.tire.back": "Reifen hinten",
    "body.weight.total": "zul. Gesamtgewicht",
    "body.weight.self": "Eigengewicht",
}

const enumTexts = {
    "type": { car: "PKW", truck: "LKW" },
    "engine.type": { otto: "Otto", diesel: "Diesel" },
    "engine.drive": { front: "Frontantrieb", back: "Heckantrieb", awd_permanent: "Allrad permanent" },
    "engine.gearType": { tiptronic: "Tiptronic", manual: "Manuell", dsg: "DSG" },
    "engine.fuel": { petrol98: "ROZ 98", petrol95: "ROZ 95", diesel: "Diesel" },
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
            "model", "",
            "codes.manufacture", "codes.afb",
            {
                "kba": ["codes.kba.hsn", "codes.kba.tsn"]
            }, "insurance.liability",
            "codes.ets", "insurance.partialCover",
            "codes.dat", "insurance.fullCover",
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
            "engine.cylinder", "engine.capacity",
            "engine.drive", "engine.maxSpeed",
            "engine.gears", {
                "torque": [
                    "engine.torque.torque", "engine.torque.rpm"
                ]
            },
            "engine.gearType", "engine.acc0to100",
            "engine.fuel", "engine.acc80to100",
            {
                "consumption": [
                    "engine.consumption.city", "engine.consumption.country", "engine.consumption.combined"
                ]
            }, "engine.acc80to120",
            "engine.range", "engine.noise.still",
            "engine.co2Emission", "engine.noise.drive",
        ]
    },
    "body": {
        name: "Karosseriedaten",
        fields: [
            "body.shape", "body.doors",
            "body.backType", "body.seats",
            "body.tire.front", "body.weight.total",
            "body.tire.back", "body.weight.self",
        ]
    }
}

router.use((req, res, next) => {
    console.log('schema')
    next()
})

function mapField(fields, key) {
    const field = fields[key]
    let fieldType = field.instance
    let unit = null
    let fieldEnumTexts = null
    if (field.options.fractions !== undefined) {
        if (field.options.fractions == 0) {
            fieldType = "Integer"
        }
    }
    if (field.options.unit !== undefined) {
        unit = field.options.unit
    }
    if (Object.keys(enumTexts).find(et => et === field.path)) {
        fieldEnumTexts = enumTexts[field.path]
    }
    return {
        field: field.path,
        label: fieldNames[field.path],
        required: !!field.isRequired,
        type: fieldType,
        unit,
        enumTexts: fieldEnumTexts,
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
