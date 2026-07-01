const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

process.on('uncaughtException', (err) => {
  console.log('uncaughtException shutting down...');

  console.log(err.name, err.message);

  process.exit(1);
});

const app = require('./app');
const globalErrorHandller = require('./controllers/errorController');

const DB = process.env.DATA_BASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log('db connect success');
  });
// .catch((err) => console.log('cant connect with database server'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app runing on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandledRejection shutting down');
  process.exit(1);
});
