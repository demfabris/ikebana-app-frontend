const initialState = {
    current: {url: 'arrangements'}
}

export const changeUrl = (payload) => {
    return {
        type: "CHANGE_URL",
        payload
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case "CHANGE_URL": {
            const payload = action.payload
            return {
                current: {
                    url: payload
                }
            }
        }
        default: {
            return state;
        }
    }
} 
