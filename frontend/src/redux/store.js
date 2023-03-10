import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './slices/productListSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import payReducer from './slices/paySlice';

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productReducer,
        cart: cartReducer,
        user: userReducer,
        pay: payReducer
    },
})

export default store;