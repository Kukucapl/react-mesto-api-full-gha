const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const ERROR_STATUS = require('./data/err');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb')
  .catch((err) => console.log(err));

app.use(bodyParser.json());
app.use((req, res, next) => {
  req.user = {
    _id: '649712570768b0fb474a87d7',
  };

  next();
});
app.use('/', userRouter);
app.use('/', cardRouter);
app.use('*', (req, res) => { res.status(ERROR_STATUS.NOT_FOUND).send({ message: 'Адресс не существует' }); });

app.listen(PORT);
