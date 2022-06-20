import {
    CLIENT_CREATE_FAIL,
    CLIENT_CREATE_REQUEST,
    CLIENT_CREATE_SUCCESS, CLIENT_DELETE_FAIL,
    CLIENT_DELETE_REQUEST,
    CLIENT_DELETE_SUCCESS,
    CLIENT_EDIT_FAIL,
    CLIENT_EDIT_REQUEST,
    CLIENT_EDIT_SUCCESS,
    CLIENT_GETBYEMAIL_REQUEST,
    CLIENT_GETBYEMAIL_SUCCESS,
    CLIENT_GETBYID_REQUEST,
    CLIENT_GETBYID_SUCCESS,
    CLIENT_LIST_FAIL,
    CLIENT_LIST_REQUEST,
    CLIENT_LIST_SUCCESS,

} from "../Constants/ClientConstants";
import axios from "axios";
import { toast } from "react-toastify";
import {logout} from "./userActions";
import {URL} from "../Url";



// ALL CLIENT
export const listClient = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CLIENT_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/clients`, config);

    dispatch({ type: CLIENT_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: CLIENT_LIST_FAIL,
      payload: message,
    });
  }
};


//create client
export const createClient = (client) => async (dispatch, getState) => {
  try{
dispatch({ type: CLIENT_CREATE_REQUEST });
    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
},
    };

    const { data } = await axios.post(`/api/clients`, client, config);


    dispatch({ type: CLIENT_CREATE_SUCCESS, payload: data });
    toast.success("Client created successfully");
    }
    catch(error){

        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        toast.warn(message);
        dispatch({
            type: CLIENT_CREATE_FAIL,
            payload: message,
        });
    }

}

//get client by email
export const getClientByEmail = (email) => async (dispatch, getState) => {
    try {
        dispatch({ type: CLIENT_GETBYEMAIL_REQUEST});

        const {
        userLogin: { userInfo },
        } = getState();

        const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
        };
        const { data } = await axios.get(`/api/clients/${email}`, config);
        dispatch({ type: CLIENT_GETBYEMAIL_SUCCESS, payload: data });
        }

        catch(error){
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            // toast.warn(message);
        }
}

//get client by id
export const getClientById = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CLIENT_GETBYID_REQUEST});

        const {
        userLogin: { userInfo },
        } = getState();

        const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
        };
        const { data } = await axios.get(`/api/clients/getById/${id}`, config);
        dispatch({ type: CLIENT_GETBYID_SUCCESS, payload: data });
        }

        catch(error){
            const message =
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message;
            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            // toast.warn(message);
        }
}

//edit client
export const editClient = (client) => async (dispatch, getState) => {
    try {
        dispatch({ type: CLIENT_EDIT_REQUEST });

        const {
        userLogin: { userInfo },
        } = getState();

        const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
        };
        const { data } = await axios.put(`/api/clients/editById/${client.clientId}`, client, config);

        dispatch({ type: CLIENT_EDIT_SUCCESS, payload: data });
        toast.success("Client updated successfully");
}

    catch(error){
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        toast.warn(message);
        dispatch({
            type: CLIENT_EDIT_FAIL,
            payload: message,
        });

    }
}

//delete client
export const deleteClient = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CLIENT_DELETE_REQUEST });

        const {
        userLogin: { userInfo },
        } = getState();

        const config = {
        headers: {
            Authorization: `Bearer ${userInfo.token}`,
        },
        };
        const { data } = await axios.delete(`/api/clients/deleteById/${id}`, config);

        dispatch({ type: CLIENT_DELETE_SUCCESS, payload: data });
        toast.success("Client deleted successfully");
    }

    catch(error){
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        if (message === "Not authorized, token failed") {
            dispatch(logout());
        }
        toast.warn(message);
        dispatch({
            type: CLIENT_DELETE_FAIL,
            payload: message,
        });

        }
}



