import {
    CATEGORY_CREATE_FAIL,
    CATEGORY_CREATE_REQUEST,
    CATEGORY_CREATE_SUCCESS,
    CATEGORY_DELETE_FAIL,
    CATEGORY_DELETE_SUCCESS,
    CATEGORY_LIST_FAIL,
    CATEGORY_LIST_REQUEST,
    CATEGORY_LIST_SUCCESS,
} from "../Constants/CategoryConstants";
import axios from "axios";
import { logout } from "./userActions";
import {toast} from "react-toastify";
import {PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS} from "../Constants/ProductConstants";
import {URL} from "../Url";


// create category
export const createCategory = (name,description) =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: CATEGORY_CREATE_REQUEST });

            const {
            userLogin: { userInfo },
            } = getState();

            const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
            };

            const { data } = await axios.post(
                `/api/categories/`,
                { name,description },
                config
            );

            dispatch({ type: CATEGORY_CREATE_SUCCESS, payload: data });
            toast.success("Category created successfully");
        } catch (error) {
            const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            dispatch({
            type: CATEGORY_CREATE_FAIL,
            payload: message,
            });
            toast.error("Verify Your Data Maybe A Category With This Name Already Exists");
            }
}




//get categorys
export const listCategories = () =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: CATEGORY_LIST_REQUEST });

            const {
            userLogin: { userInfo },
            } = getState();

            const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
            };

const { data } = await axios.get(
                `/api/categories/`,
                config
            );
            dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
        } catch (error) {
            const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            dispatch({
            type: CATEGORY_LIST_FAIL,
            payload: message,
            });
            toast.error("Verify Your Data Maybe A Category With This Name Already Exists");
}
}

//delete category
export const deleteCategory = (id) =>
    async (dispatch, getState) => {
        try {
            dispatch({ type: CATEGORY_DELETE_SUCCESS });

            const {
            userLogin: { userInfo },
            } = getState();

            const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
            };

            const { data } = await axios.delete(
                `/api/categories/${id}`,
                config
            );

            dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data });
            toast.success("Category deleted successfully");
        } catch (error) {
            const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
            if (message === "Not authorized, token failed") {
                dispatch(logout());
            }
            dispatch({
            type: CATEGORY_DELETE_FAIL,
            payload: message,
            });
            toast.warn(message);
            }

}

