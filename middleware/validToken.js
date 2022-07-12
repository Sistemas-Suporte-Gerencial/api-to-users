const tokenFree = [];

const validToken = (req, res, next) => {
    if(!tokenFree.includes(req.path)){
        if(req.headers.authorization === process.env.TOKEN) {
            next();
        } else {
            return res.status(401).json({
                error: 'Unauthorized'
            });
        }
    }
}

export default validToken;