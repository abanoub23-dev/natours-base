const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

const handleDublicateFieldsDB = (err) => {
  const message = `duplicate field value: ${err.keyValue.name} insrt new value `;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `invalid input data ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('invalid token please login agin', 401);

const handleJWTTokenExpiredError = () =>
  new AppError('your token has expired! please login again', 401);

const sendErrorDev = (err, req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }
  res.status(err.statusCode).render('error', {
    title: 'Something Went Wrong',
    msg: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  //  API
  if (req.originalUrl.startsWith('/api')) {
    // Operational, trusted error we can send
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

      // programming error or server errors
    }
    // log the error
    console.error('error: ', err);
    // send genric message
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong ',
    });
  }
  // render website
  if (err.isOperational) {
    return res.status(err.statusCode).render('error', {
      title: 'Something Went Wrong',
      msg: err.message,
    });

    // programming error or server errors
  }
  // log the error
  console.error('error: ', err);
  // send genric message
  return res.status(err.statusCode).render('error', {
    title: 'Something Went Wrong',
    msg: 'Please try again later',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err, name: err.name, message: err.message };
    error.message = err.message;
    if (error.name === 'CastError') {
      error = handleCastErrorDB(error);
    }

    if (error.code === 11000) {
      error = handleDublicateFieldsDB(error);
    }

    if (error.name === 'ValidationError') {
      error = handleValidationErrorDB(error);
    }
    if (error.name === 'JsonWebTokenError') {
      error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
      error = handleJWTTokenExpiredError();
    }

    sendErrorProd(error, req, res);
  }
};
