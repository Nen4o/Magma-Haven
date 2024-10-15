const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const volcanoController = require('./controllers/volcanoController');

router.use(volcanoController);
router.use(homeController);
router.use(authController);

router.all('*', (req, res) => {
    res.redirect('/404');
})

module.exports = router; 