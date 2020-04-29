const initialState = {
    keys: [],
}

export const storeAuth = (payload) => {
    return {
        type: "STORE_AUTH",
        payload
    }
}

export const refreshAuth = (payload) => {
    return {
        type: "REFRESH_AUTH",
        payload
    }
}

export const logout = () => {
    return {
        type: "CLEAR_AUTH",
    }
}


export default (state = initialState, action) => {
    switch(action.type) {
        case "STORE_AUTH": {
            const payload = action.payload
            return {
                keys: [
                    payload
                ]
            }
        }
        case "REFRESH_AUTH": {
            const payload = action.payload
            return {
                keys: [
                    payload
                ]
            }
        }
        case "CLEAR_AUTH": {
            return initialState
        }
        default: {
            return state;
        }
    }
}
