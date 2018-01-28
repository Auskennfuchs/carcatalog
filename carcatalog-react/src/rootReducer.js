import { combineReducers } from 'redux'
import UserReducer from './reducers/user'
import SchemaReducer from './reducers/schema'

import { USER_LOGGED_OUT } from './actions/login'

const appReducers = combineReducers({
    user: UserReducer,
    schemes: SchemaReducer,
})

export default (state, action) => {
    if (action.type === USER_LOGGED_OUT) {
        state = undefined
    }
    return appReducers(state, action)
}