import { configureStore } from '@reduxjs/toolkit'
import productListReducer from './slices/productListSlice'
import productReducer from './slices/productSlice'
import cartReducer from './slices/cartSlice';

const store = configureStore({
    reducer: {
        productList: productListReducer,
        productDetails: productReducer,
        cart: cartReducer
    },
})

export default store;