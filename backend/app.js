const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { errorHandler } = require('./middlewares/error-handler');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFound = require('./data/notfound');
const {
  createUserValidator, loginValidator,
} = require('./validators/validators');
const cors = require('./middlewares/cors');

const { PORT = 3000, DB_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
const app = express();

app.use(cors);

mongoose.connect(DB_URL)
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.post('/signin', loginValidator, login);
app.post('/signup', createUserValidator, createUser);

app.use(auth);

app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res, next) => { next(new NotFound('Адресс не существует')); });
app.use(errors());
app.use(errorHandler);
app.listen(PORT);
