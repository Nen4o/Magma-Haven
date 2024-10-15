const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 2
    },
    email: {
        type: String,
        required: true,
        minLength: 10,
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    }
})

userSchema.pre('save', async function () {
    try {
        console.log(this.password);
        const hashPassword = await bcrypt.hash(this.password, 10);
        this.password = hashPassword;
    } catch (err) {
        console.log(err);
    }

});

const User = mongoose.model('User', userSchema);

module.exports = User;