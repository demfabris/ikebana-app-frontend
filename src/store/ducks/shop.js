const initialState = {
    cart: [],
}

export const addCart = (payload) => {
    return {
        type: "ADD_CART",
        payload
    }
}

export const delCart = (payload) => {
    return {
        type: "DEL_CART",
        payload
    }
}

export const clearCart = () => {
    return {
        type: "CLEAR_CART"
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "ADD_CART": {
            const payload = action.payload
            return {
                cart: [
                    ...state.cart,
                    payload
                ]
            }
        }

        case "DEL_CART": {
            const payload = action.payload
            return {
                cart: [
                    ...state.cart.filter((el) => {
                        return el.project_id != payload
                    })
                ]
            }
        }

        case "CLEAR_CART": {
            return {
                cart: [],
            }
        }
        default: {
            return state;
        }
    }
};
