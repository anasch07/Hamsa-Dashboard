import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { userListReducer, userLoginReducer } from "./Reducers/userReducers";
import {clientByIdReducer, clientCreateReducer, clientEditReducer, clientListReducer} from "./Reducers/clientReducers";
import {
  productCreateReducer,
  productDeleteReducer,
  productEditReducer,
  productListReducer,
  productUpdateReducer,
} from "./Reducers/ProductReducers";
import {
  orderCreateReducer, orderDeleteReducer,
  orderDeliveredReducer,
  orderDetailsReducer,
  orderListReducer, orderPaidReducer, orderShippedReducer,
} from "./Reducers/OrderReducres";
import {updateStock, updateStockOfProduct} from "./Actions/ProductActions";
import {createCategory, getCategories} from "./Actions/CategoryActions";
import {categoryCreateReducer, categoryDeleteReducer, categoryListReducer} from "./Reducers/categoryReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  clientList: clientListReducer,
  clientCreate: clientCreateReducer,
    getClientById: clientByIdReducer,
    clientEdit: clientEditReducer,
  productList: productListReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productEdit: productEditReducer,
  productUpdate: productUpdateReducer,
  orderList: orderListReducer,
  orderCreate: orderCreateReducer,
  orderDelete: orderDeleteReducer,
  orderDetails: orderDetailsReducer,
  orderDeliver: orderDeliveredReducer,
  orderPaid: orderPaidReducer,
  orderShipped: orderShippedReducer,
  updateStock: updateStockOfProduct,
  categoryList:categoryListReducer,
  categoryCreate:categoryCreateReducer,
  categoryDelete:categoryDeleteReducer
});

// login
const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromLocalStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
