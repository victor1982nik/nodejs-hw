const jwt = require("jsonwebtoken");
const { User } = require("../db/userModel");
const {NotAutorizedError} = require("../helpers/errors");

const authMiddleware = async(req,res,next) => {
    try { 
        const [tokenType, token] = req.headers.authorization.split(' ');
        
     if (!token || tokenType !== "Bearer"){
        next(new NotAutorizedError("Not authorized"))
    }    
        const payload = jwt.decode(token, process.env.JWT_SECRET);
        const user = await User.findById(payload._id);
        if (!user || !user.token) {
            next(new NotAutorizedError("Not authorized"))
        }
        req.user = payload;
        // req.token = token;        
        next();
    }catch(e){
        next(new NotAutorizedError("Invalid token"))
    }        
}

module.exports = {authMiddleware}