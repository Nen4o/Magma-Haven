const User = require('../models/User');

const createUser = (registerData) => {
    return User.create(registerData);
}

const findUserByEmail = (email) => {
    return User.findOne({ email })
}

module.exports = {
    createUser,
    findUserByEmail,
}