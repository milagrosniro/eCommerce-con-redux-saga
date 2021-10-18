import { combineReducers } from "redux";

import userReducer from "./User/user.reducer";
import productsReducer from "./Products/products.reducer";
import cartReducer from "./Cart/cart.reducer";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; //localStorage
import ordersReducer from './Orders/orders.reducer';

export const rootReducer = combineReducers({
    user: userReducer, //estado
    productsData: productsReducer,
    cartData: cartReducer,
    ordersData: ordersReducer
});

const configStorage = {
    key: 'root',
    storage,
    whiteList: ['cartData'] // aqui se guarda todo lo que queremos que 'persista' en el redux store
}

export default persistReducer(configStorage, rootReducer);