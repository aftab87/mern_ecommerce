import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const curItem = action.payload
            const existingItem = state.cartItems.find(item => item.product === curItem.product)

            if (existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(item => item.product === existingItem.product ? curItem : item)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, curItem]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(curItem => curItem.product !== action.payload)
            }
        default:
            return state;
    }
}