export const SCHEMA_LOAD = "SCHEMA_LOAD"

export const schemaLoad = (name, schema) => ({
    type: SCHEMA_LOAD,
    name, 
    schema
})