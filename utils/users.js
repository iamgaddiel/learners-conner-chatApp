

const Users = [] // usersDB

const Messages = [] // message DB


// add user else update user id
function addUser(id, username) {
    let userDetail = { id, username }
    let user = getUser(username)

    if (!user) {
        Users.push(userDetail)
    } else {
        user.id = id
    }
    return user
}

function getUser(username) {
    // todo: query by userId not username 
    // const user = Users.find(user => user.id === userId)
    const user = Users.find(user => user.username === username)
    if (user !== -1){
        console.log('userId', user)
    }
    return user
}

function getAllUsers(username) { 
    users = Users.filter( user => user.username !== username)
    return users 
}

module.exports = {
    getUser,
    getAllUsers,
    addUser,
}

