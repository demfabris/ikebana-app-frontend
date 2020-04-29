const initialState = {
    data: {
        'picture': 'https://ikebana-app-users.s3-sa-east-1.' +
                        'amazonaws.com/default/default_user.png'
    },
    username: {}
}

export const loadUsername = (payload) => {
    return {
        type: 'LOAD_USERNAME',
        payload
    }
}

export default (state = initialState, action) => {
    switch(action.type) {
        case 'LOAD_USERNAME': {
            const payload = action.payload
            return {
                username: {
                    ...payload
                }
            }
        }
        default: {
            return state;
        }
    }
}
