const router = require('express').Router();

router.get('/', (req, res) => {

    console.log(res.user);

    res.render('home/home')
})

module.exports = router;