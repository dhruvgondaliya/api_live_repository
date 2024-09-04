const { verifyToken } = require("../helpers/auth");
const { response } = require("../helpers/response");
const { statusCodes } = require("../helpers/constants");
const Admin = require("../models/adminModel");
const messages = require("../helpers/messages");

const authMiddleware = async(req, res, next) => {
    try{
        if(!req.headers["authorization"]){
            return response(res, statusCodes.NOT_FOUND, "No token provided!")
        }
        let decodedToken = verifyToken(req.headers["authorization"]);
        let userId = decodedToken["id"];
        let admin = await Admin.findOne({
            id: userId
        });
        if(!admin){
            return response(res, statusCodes.UNAUTHORIZE, "Unauthorized")
        }
        req.headers.userId = userId;
        next();
    }catch(err){
        console.log(err);
        return response(res, statusCodes.NOT_FOUND, "Token expired.")
    }
}

module.exports = {
    authMiddleware
}