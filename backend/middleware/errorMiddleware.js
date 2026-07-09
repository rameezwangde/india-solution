exports.errorHandler = (err, req, res, next) => {
  // error middleware placeholder
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || 'Server Error'
  });
};
