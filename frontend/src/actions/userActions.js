import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  SUPERVISOR_REGISTER_REQUEST,
  SUPERVISOR_REGISTER_SUCCESS,
  SUPERVISOR_REGISTER_FAIL,
  GET_SUPERVISOR_REQUEST,
  GET_SUPERVISOR_FAIL,
  GET_SUPERVISOR_SUCCESS,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_REQUEST,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_FAIL,
  UPDATE_USER_ROLE_SUCCESS,
  GET_WORKERS_FAIL,
  GET_WORKERS_REQUEST,
  GET_WORKERS_SUCCESS,
} from "../constants/userConstants.js";
import axios from "axios";

const register =
  (firstName, lastName, phoneNumber, address, email, password) =>
  async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });

      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          password,
        }
      );

      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const registerSupervisor =
  (firstName, lastName, phoneNumber, address, email,userRole, superVisor, password) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SUPERVISOR_REGISTER_REQUEST,
      });

      const { data } = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          firstName,
          lastName,
          email,
          phoneNumber,
          address,
          password,
          userRole : userRole,
          superVisor
        }
      );

      dispatch({
        type: SUPERVISOR_REGISTER_SUCCESS,
        payload: data,
      });

      // dispatch({
      //   type: USER_LOGIN_SUCCESS,
      //   payload: data,
      // });

      // localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: SUPERVISOR_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  const getSupervisor = (excludedRoles) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_SUPERVISOR_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.get(
        `http://localhost:5000/api/users/admin/getUsers?excludedRoles=${excludedRoles.join(
          "&excludedRoles="
        )}`,
        config
      );
      dispatch({
        type: GET_SUPERVISOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SUPERVISOR_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });

    const { data } = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
};

const updateUserDetails = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      `http://localhost:5000/api/users/updateProfile`,
      user,
      config
    );

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/users/${userInfo.id}`,
      config
    );

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateUserRole = (role, email) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UPDATE_USER_ROLE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.patch(
      "http://localhost:5000/api/users/updateUserRole",
      { userRole: role, email: email },
      config
    );

    dispatch({
      type: UPDATE_USER_ROLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_ROLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getWorkers = (excludedRoles) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_WORKERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:5000/api/users/admin/getUsers?excludedRoles=${excludedRoles.join(
        "&excludedRoles="
      )}`,
      config
    );
    dispatch({
      type: GET_WORKERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_WORKERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export {
  register,
  registerSupervisor,
  getSupervisor,
  login,
  updateUserDetails,
  getUserDetails,
  logout,
  updateUserRole,
  getWorkers,
};
