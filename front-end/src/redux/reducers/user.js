import constants from '../../utils/constants'

const user = (state = {}, action) => {
    const { username, name, password, lastname, birth, bio } = action
    switch (action.type) {
        case constants.CREATE_USER:
            return {
                ...state,
                user: {
                    username,
                    password,
                    name,
                    lastname,
                    birth,
                    bio,
                }
            }
        default:
            return state
    }
}

export default user