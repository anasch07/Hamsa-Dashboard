import {
    ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS, ORDER_DELETE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS,
    ORDER_DELIVERED_FAIL,
    ORDER_DELIVERED_REQUEST,
    ORDER_DELIVERED_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS, ORDER_UPDATE_FAIL, ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS,

} from "../Constants/OrderConstants";

import {
    SET_PARTIAL_ARTICLES,
    SET_PERPAGE,
    SET_PAPE_COUNT,
    SET_OFFSET
} from '../Constants/OrderConstants';



import axios from "axios";
import { logout } from "./userActions";
import {toast} from "react-toastify";
import {URL} from "../Url";

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/all`, config);

    dispatch({ type: ORDER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: message,
    });
  }
};

// ORDER DETAILS
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}`, config);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: message,
    });
  }
};

// ORDER DELIVER
export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_DELIVERED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${order._id}/delivered`,
      {},
      config
    );
    dispatch({ type: ORDER_DELIVERED_SUCCESS, payload: data });
    toast.success("Order delivered successfully");
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: ORDER_DELIVERED_FAIL,
      payload: message,
    });
      toast.warn(message)
  }

};


// ORDER ADD
export const createOrder = (order) => async(dispatch,getState) => {
  try{
    dispatch({type : ORDER_CREATE_REQUEST})

    const {
      userLogin : {userInfo}
    } = getState()

    const config = {
      headers : {
        "Content-Type" : "application/json",
        Authorization : `Bearer ${userInfo.token}`
      }
    }
    const {data} = await axios.post(`/api/orders`,order,config)
    dispatch({type : ORDER_CREATE_SUCCESS,payload : data})
    toast.success("Order created successfully");

    //More codes to add
  }catch(err){
    const message = err.response && err.response.data.message ? err.response.data.message : err.message

    if(message === "Not authorized, token failed"){
      dispatch(logout())
    }
    dispatch({type : ORDER_CREATE_FAIL,payload : message})
  }
}

//make order paid by id

export const makeOrderPaid = (order) => async(dispatch,getState) => {
    try{
        dispatch({type : ORDER_UPDATE_REQUEST})

        const {
        userLogin : {userInfo}
        } = getState()

        const config = {
        headers : {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${userInfo.token}`
        }
        }
        const {data} = await axios.put(`/api/orders/${order._id}/pay`,{},config)
        dispatch({type : ORDER_UPDATE_SUCCESS,payload : data})
        toast.success("Order paid successfully");

        //More codes to add
    }catch(err){
        const message = err.response && err.response.data.message ? err.response.data.message : err.message

        if(message === "Not authorized, token failed"){
        dispatch(logout())
        }
        dispatch({type : ORDER_UPDATE_FAIL,payload : message})
    }
}

//make order shipped by id

    export const makeOrderShipped = (order) => async(dispatch,getState) => {
          try{
                dispatch({type : ORDER_UPDATE_REQUEST})

                const {
                userLogin : {userInfo}
                } = getState()

                const config = {
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${userInfo.token}`
                }
                }
                const {data} = await axios.put(`/api/orders/${order._id}/ship`,{},config)
                dispatch({type : ORDER_UPDATE_SUCCESS,payload : data})
                toast.success("Order shipped successfully");

                //More codes to add
            }catch(err){
                const message = err.response && err.response.data.message ? err.response.data.message : err.message

                if(message === "Not authorized, token failed"){
                dispatch(logout())
                }
                dispatch({type : ORDER_UPDATE_FAIL,payload : message})
            }
    }


    //delete order
    export const deleteOrder = (order) => async(dispatch,getState) => {

        try{
            dispatch({type : ORDER_DELETE_REQUEST})

            const {
            userLogin : {userInfo}
            } = getState()

            const config = {
            headers : {
                "Content-Type" : "application/json",
                Authorization : `Bearer ${userInfo.token}`
            }
            }
            const {data} = await axios.delete(`/api/orders/${order._id}`,config)
            dispatch({type : ORDER_DELETE_SUCCESS,payload : data})
            toast.success("Order deleted successfully");

            //More codes to add
        }catch(err){
            const message = err.response && err.response.data.message ? err.response.data.message : err.message

            if(message === "Not authorized, token failed"){
            dispatch(logout())
            }
            dispatch({type : ORDER_DELETE_FAIL,payload : message})
        }
    }
