const  validToken = (req, res, next) => {
    if(req.headers.authorization === process.env.TOKEN) {
        next();
    } else {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
}

export default validToken;