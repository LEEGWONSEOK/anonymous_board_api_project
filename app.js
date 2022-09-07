const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { sequelize } = require('./api/models');
const postRouter = require('./api/routes/posts');

dotenv.config();
const app = express();

app.set('port', process.env.SERVER_PORT || 8080);

// DB 연결
sequelize.sync({ force: false })
  .then(() => {
    console.log('◆ DB Connect!');
  })
  .catch(e => {
    console.log(e);
  });

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router
app.use('/api/posts', postRouter);

// 404 Handler
app.use('*', (req, res, next) => {
  res.status(404).send('404 not found');
});

// error Handler
app.use((err, req, res, next) => {
  console.error(err);
  res.sendStatus(500);
})

// Connect Server
app.listen(app.get('port'), () => {
  console.log(`Serving on port ${app.get('port')}`);
});