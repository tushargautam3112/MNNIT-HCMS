import { GET_ROLES_REQUEST,GET_ROLES_SUCCESS,GET_ROLES_FAIL } from "../constants/userRoleConstants"

export const getRolesReducer = (state = {},action) => {
    switch(action.type) {
        case GET_ROLES_REQUEST:
            return {laoding:true}
        case GET_ROLES_SUCCESS:
            return {loading: false, roles: action.payload}
        case GET_ROLES_FAIL:
            return {loading: false, error: action.payload}
        default: 
            return state
    }
}