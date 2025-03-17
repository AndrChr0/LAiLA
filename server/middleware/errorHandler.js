export function errorHandler(err, req, res, next) {
    // print error stack to console
    console.error(err.stack);

    // custom error handling depending on error type
    if (err.code === "validationError") {
        return res.status(400).json({ error: err.message });
    }

    if (err.code === "ER_BAD_FIELD_ERROR") {
        return res.status(400).json({ error: "Invalid field in request" });
    }

    if (err.code === "ER_NO_SUCH_TABLE") {
        return res.status(500).json({ error: "Table does not exist in the database" });
    }

    if (err.code === "ECONNREFUSED") {
        return res.status(503).json({ error: "Database connection refused" });
    }

    // handle errors with specified status codes, such as manually thrown errors
    if (err.status) {
        return res.status(err.status).json({ error: err.message });
    }

    // default to internal server error
    res.status(500).json({ error: "An unexpected error occurred" });
}
