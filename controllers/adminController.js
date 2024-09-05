const Admin = require('../models/adminModel');
const { response } = require('../helpers/response');
const { statusCodes } = require('../helpers/constants')
const { encryptPassword, decryptPassword, generateToken } = require("../helpers/auth");

const signUp = async(req, res) => {
    try{
        const { email, password } = req.body;
        if(!email || !password){
            return response(res, statusCodes.NOT_FOUND, "Please enter your email and password");
        }
        let admin = await Admin.findOne({
            attributes: ["id"],
            where: {
                email
            }
        })
        if(!email){
            return response(res, statusCodes.NOT_FOUND, "Invalid credentials")
        }
        if(admin){
            return response(res, statusCodes.BAD_REQUEST, "Admin is already signup", admin)
        }
        const create = await Admin.create({
            email,
            password: encryptPassword(password)
        })
        if(create){
            return response(res, statusCodes.SUCCESS, "Signup successfully", create);
        } else{
            return response(res, statusCodes.SERVER_ERROR, "Server error")
        }
    } catch(err){
        console.log(err);
        return response(res, statusCodes.SERVER_ERROR, "Server error")
    }
}

const login = async(req, res) => {
    try{
        const {email, password } = req.body;
        if(!email || !password){
            return response(res, statusCodes.NOT_FOUND, "Please enter your email and password");
        }
        let admin = await Admin.findOne({
            attributes: ["id", "email", "password"],
            where: {
                email
            }
        })
        if(!admin){
            return response(res, statusCodes.BAD_REQUEST, "Invalid credentials")
        }
        let admindetails = admin.get({plain: true});
        if(decryptPassword(admindetails.password) != password){
            return response(res, statusCodes.BAD_REQUEST, "Invalid credentials")
        }
        return response(res, statusCodes.SUCCESS, "Login successfully", {
            accessToken: generateToken({id: admindetails.id})
        })
    }catch(err){
        console.log(err);
    }
}


module.exports = { signUp, login }