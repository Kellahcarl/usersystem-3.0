  
const jwt = require('jsonwebtoken');

module.exports = ( req, res, next ) =>
{
    const authHeader= req.headers['authorization'];

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ message: "Access denied. No token provided" });

    try {
        
        jwt.verify( token, process.env.SECRET_KEY )
        // req.user = data;
        next();
    } catch (error) {
        res.status(400).json({ message: "Invalid token" })
    }


}