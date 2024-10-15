const express = require('express');
const handlebars = require('express-handlebars');
const router = require('./router');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const { isAuth } = require('./middlewares/authMiddleware');

const port = 3000;

// config express
const app = express();
app.use(express.static('src/public'));
app.use(cookieParser());
app.use(isAuth);
app.use(express.urlencoded({ extended: false }));
app.use(router);

// config handlebars
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
}));
app.set('view engine', 'hbs');
app.set('views', './src/views');

// start server
mongoose.connect('mongodb://localhost:27017/magma-haven')
    .then(() => {
        app.listen(port, () => {
            console.log('DB Connected');
            console.log('Server is listening on http://localhost:3000');

        })
    })
