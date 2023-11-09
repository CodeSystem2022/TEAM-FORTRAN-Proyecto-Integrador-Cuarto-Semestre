// not found
const notFound = (req, res) => {
    const error = new Error(`Not Found: ${req.originalUrl}`);
    res.status(404).json({
        message: error.message,
        stack: error.stack,
    });
};

// error handler
const errorHandler = (err, req, res, next) => {
    const statuscode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statuscode).json({
        message: err?.message,
        stack: err?.stack,
    });
};

module.exports = { notFound, errorHandler };
