const model = require('./login.model')

function adduser(user) {
    const newUser = new model(user);
    newUser.save()
}

async function getUser(filterUser) {
    let filter = {}
    if (filterUser !== null) { filter = { password: filterUser } }

    const user = await model.find(filter)

    if (user[0].password !== filterUser) return false
    
    return true
}

module.exports = {
    add: adduser,
    get: getUser
}