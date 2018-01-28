import { SCHEMA_LOAD } from '../actions/schema'

export default function schema(state = [], action = {}) {  
    switch (action.type) {
        case SCHEMA_LOAD:            
            return action.schema
        default:
            return state 
    }
}