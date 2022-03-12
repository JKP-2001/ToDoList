const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
        const token = req.header("auth-token");
        if (!token) {
            res.status(401).send("Token Not Found");
        }
        else {
            try {
                var decoded = jwt.verify(token, JWT_SECRET);
                req.user = decoded.user;
                next();
            }
            catch (err) {
                res.status(500).json("Try to authenticate using valid token");
            }
        }
    
}


module.exports = fetchuser;