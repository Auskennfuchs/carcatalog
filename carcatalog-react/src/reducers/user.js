import {USER_LOGGED_IN,USER_LOGGED_OUT} from '../actions/login'

export default function user(state={}, action= {}) {
    switch(action.type) {
        case USER_LOGGED_IN:
            return action.user
        case USER_LOGGED_OUT:
            document.cookie="jwt=;path=/"
            return {}
        default:
            return state;
    }
}