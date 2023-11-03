const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    const authorizationToken = req.headers['authorization'];
    if(authorizationToken){
        const authArr = authorizationToken.split(" ");
        let token;
        if(authArr[0] == 'Bearer'){
            token = authArr[1];
        }else{
            token = authArr[0];
        }
    
        jwt.verify(token, process.env.SECRETKEY,(err, user) => {
            if(err){
                return res.status(401).json({ message: 'Invalid token' });
            }
            req.user = user;
            next();
        })
    }else{
        return res.status(403).json({ message: 'Token is missing' });
    }
}


module.exports = auth;