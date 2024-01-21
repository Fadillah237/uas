exports.errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
      error: {
        status: statusCode,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? 'Error details are hidden in production' : err.stack,
      },
    });
  };
  