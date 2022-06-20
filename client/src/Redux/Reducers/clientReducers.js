import {
    CLIENT_CREATE_FAIL,
    CLIENT_CREATE_REQUEST,
    CLIENT_CREATE_SUCCESS, CLIENT_DELETE_FAIL,
    CLIENT_DELETE_REQUEST,
    CLIENT_DELETE_SUCCESS,
    CLIENT_EDIT_FAIL,
    CLIENT_EDIT_REQUEST,
    CLIENT_EDIT_SUCCESS,
    CLIENT_GETBYEMAIL_FAIL,
    CLIENT_GETBYEMAIL_REQUEST,
    CLIENT_GETBYEMAIL_SUCCESS,
    CLIENT_GETBYID_FAIL,
    CLIENT_GETBYID_REQUEST,
    CLIENT_GETBYID_SUCCESS,
    CLIENT_LIST_FAIL,
    CLIENT_LIST_REQUEST,
    CLIENT_LIST_RESET,
    CLIENT_LIST_SUCCESS,

} from "../Constants/ClientConstants";


// ALL CLIENT LIST
export const clientListReducer = (state = { CLIENTS: [] }, action) => {
  switch (action.type) {
    case CLIENT_LIST_REQUEST:
      return { loading: true };
    case CLIENT_LIST_SUCCESS:
      return { loading: false, CLIENTS: action.payload };
    case CLIENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case CLIENT_LIST_RESET:
      return { CLIENTS: [] };
    default:
      return state;
  }
};
//create client
export const clientCreateReducer = (state = { CLIENTS: [] }, action) => {
    switch (action.type) {
        case CLIENT_CREATE_REQUEST:
            return { loading: true };
        case CLIENT_CREATE_SUCCESS:
            return { loading: false, success: true, CLIENTS: action.payload };
        case CLIENT_CREATE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}

//get client by id
export const clientByIdReducer = (state = { client: [] }, action) => {
    switch (action.type) {
        case CLIENT_GETBYID_REQUEST:
            return { loading: true,client: [] };
        case CLIENT_GETBYID_SUCCESS:
            return { loading: false, client: action.payload };
        case CLIENT_GETBYID_FAIL:
            return { loading: false, client: action.payload };
        default:
            return state;
    }
}

//edit client
export const clientEditReducer = (state = { CLIENTS: [] }, action) => {
    switch (action.type) {
        case CLIENT_EDIT_REQUEST:
            return { loading: true };
        case CLIENT_EDIT_SUCCESS:
            return { loading: false, success: true, CLIENTS: action.payload };
        case CLIENT_EDIT_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
}
}

//delete client
export const clientDeleteReducer = (state = { CLIENTS: [] }, action) => {
    switch (action.type) {
        case CLIENT_DELETE_REQUEST:
            return { loading: true };
        case CLIENT_DELETE_SUCCESS:
            return { loading: false, success: true, CLIENTS: action.payload };
        case CLIENT_DELETE_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
}



