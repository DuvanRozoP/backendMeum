const storeUser = require('./login.store')

function addUser(user,password) {
    return new Promise((resolve,reject) => {

        if(!user || !password) reject('User y/o password invalidos');

        const data = {
            user: user,
            password: password
        }
        storeUser.add(data);
        resolve(data);
        
    });
}

// GET USER CONTROLLER CAMPOS AND TYPE
function getUser(filterUser) {
    return new Promise((resolve,reject) => { resolve(storeUser.get(filterUser)) })
}

module.exports = {
    addUser,
    getUser
}