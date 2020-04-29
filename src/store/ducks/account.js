const initialState = {
    userData: [],
}

export const storeUserData = (payload) => {
    return {
        type: "STORE_DATA",
        payload
    }
}

export const clearUserData = () => {
    return {
        type: "CLEAR_DATA",
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "STORE_DATA": {
            const payload = action.payload
            return {
                userData: [
                    payload
                ]
            }
        }
        case "CLEAR_DATA": {
            return {
                userData: [],
            }
        }
        default: {
            return state;
        }
    }
}
