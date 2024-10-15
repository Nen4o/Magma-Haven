const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
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