const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');

const app = express();
const db = require('./db');
const dbHelpers = require('./helpers/dbHelpers')(db);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use('/api/users', usersRouter(dbHelpers));
app.use('/api/login', loginRouter(dbHelpers));
app.use('/api/signup', signupRouter(dbHelpers));


module.exports = app;
