const c_users = [];

const joinUser = (id,username,room) => {
    const p_user = {id,username,room}

    c_users.push(p_user)
    console.log(c_users,"users")

    return p_user
}

const getCurrentUser = (id) => {
    return c_users.find((p_user)=>p_user.id === id)
}

const userDisconnect = (id) => {
    const index = c_users.findIndex((p_user)=> p_user.id === id)

    if (index !== -1){
        return c_users.splice(index, 1)[0]
    }
}

module.exports = {
    joinUser,
    getCurrentUser,
    userDisconnect,
}