import axios from "axios";
import { GET_ROLES_SUCCESS, GET_ROLES_FAIL, GET_ROLES_REQUEST } from "../constants/userRoleConstants";

const getRoles = (excludedRoles) => async (dispatch, getState) => {
    try {
        dispatch({
            type: GET_ROLES_REQUEST
        })

        const { userLogin: { userInfo } } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`http://localhost:5000/api/userRoles/roles?excludedRoles=${excludedRoles.join('&excludedRoles=')}`, config)

        dispatch({
            type: GET_ROLES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_ROLES_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message,
        })
    }
}

export { getRoles }