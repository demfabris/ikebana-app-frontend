const initialState = {
    notifications: [],
}

export const loadNotif = (payload) => {
    return {
        type: "LOAD_NOTIFICATIONS",
        payload
    }
}

export const setNotifRead = (payload) => {
    return {
        type: "SET_NOTIFICATION_READ",
        payload
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'LOAD_NOTIFICATIONS': {
            const payload = action.payload
            return {
                notifications: payload
            }
        }
        case 'SET_NOTIFICATION_READ': {
            const payload = action.payload
            const updatedState = state.notifications.map((el) => {
                if (el.id === payload) {
                    el.is_read = true;
                    return el
                } else {
                    return el
                }
            })
            return {
                notifications: updatedState
            }
        }
        default: {
            return state;
        }
    }
};
