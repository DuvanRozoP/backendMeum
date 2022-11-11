exports.success = (req, res, status, message) =>{
    res.status(status || 200).send({
        succes: message,
        error: "",
    });
}

exports.error = (req, res, status, message) =>{
    res.status(status || 401).send({
        succes: "",
        error: message,
    });
}