const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        console.log(req.headers.authorization.split(" ")[1])
        const token = req.headers.authorization.split(" ")[1];
        //its becouse usually you write "Bearer -characters token's-"  and we only need the -characters token- not the "Bearer"
        console.log(token);
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error){
        return res.status(401).json({
            messsage: 'Auth failed'
        });
    }
};