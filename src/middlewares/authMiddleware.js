const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../configs/constants');

function isAuth(req, res, next) {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const user = jwt.verify(token, JWT_SECRET);
        res.user = user;
        res.locals.isAuthenticated = true;
        return next()
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/login')
        return next();
    }
}

module.exports = {
    isAuth,
}