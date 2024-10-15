const router = require('express').Router();
const authServices = require('../services/authServices');
const bcrypt = require('bcrypt');
const { isAuth } = require('../middlewares/authMiddleware')

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/constants');

router.get('/register', (req, res) => {
    if (res.user) {
        return res.redirect('/');
    }
    res.render('auth/register');
})

router.post('/register', async (req, res) => {
    const registerData = req.body;

    try {
        if (registerData.password != registerData.rePassword) {
            throw new Error('Password does not match!');
        }

        await authServices.createUser(registerData);
        res.redirect('/login');
    } catch (err) {
        console.log(err.message);
        res.redirect('/register')
    }
})

router.get('/login', (req, res) => {
    if (res.user) {
        return res.redirect('/');
    }
    res.render('auth/login')
})

router.post('/login', async (req, res) => {
    const loginData = req.body;

    try {
        const user = await authServices.findUserByEmail(loginData.email);

        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

        if (!isPasswordValid) {
            throw new Error('Password is not valid!');
        }

        const payload = {
            email: user.email,
            _id: user.id,
            username: user.username
        }

        console.log(JWT_SECRET);

        const jwtToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '2h' });
        res.cookie('auth', jwtToken, { httpOnly: true });

        res.redirect('/');

    } catch (error) {
        console.error(error);
        res.status(400).redirect('/login');
    }
})

router.get('/logout', (req, res) => {
    if (!res.user) {
        return res.redirect('/');
    }
    res.clearCookie('auth');
    res.redirect('/');
})

module.exports = router;