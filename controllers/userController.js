const User = require('../models/userModel');
const Add_Product = require('../models/addProductModel');
const Detail = require('../models/detailsModel');
const Cart = require('../models/cartModel');
const Home = require('../models/homeScreenModel');
const { response } = require('../helpers/response');
const { statusCodes } = require('../helpers/constants')
const { encryptPassword, decryptPassword, generateToken } = require("../helpers/auth");

const signUp = async(req, res) => {
    try{
        const { admin_id, email, password, phone_number } = req.body;
        if(!email || !password || !phone_number){
            return response(res, statusCodes.NOT_FOUND, "Please enter your email, password and phone_number");
        }
        let admin = await User.findOne({
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
        const create = await User.create({
            admin_id: 1,
            email,
            password: encryptPassword(password),
            phone_number
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
        let user = await User.findOne({
            attributes: ["id", "email", "password"],
            where: {
                email
            }
        });
        if(!user){
            return response(res, statusCodes.BAD_REQUEST, "Invalid credentials")
        }
        let admindetails = user.get({plain: true});
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

const changePassword = async(req, res) => {
    try{
        const { password } = req.body;
        let userId = req.headers.userId;
        if(!password){
            return response(res, statusCodes.NOT_FOUND, "Password not provided")
        }
        const updateUser = await User.findOne({ where: { id: userId } });
        if(updateUser){
            const result = await User.update({ password: encryptPassword(password) }, {
                where: {
                    id: userId
                }
            });
            return response(res, statusCodes.SUCCESS, "Change password successfully", result)
        } else{
            return response(res, statusCodes.NOT_FOUND, "User not found")
        }
    }catch(err){
        console.log(err);
    }
}

const productAdd = async(req, res) => {
    try{
        const userId = req.headers.userId;
        const user = await User.findOne({ where: { id: userId } });
        if(!user){
            return response(res, statusCodes.NOT_FOUND, "User not found")
        }
        const product = await Add_Product.findOne({ where: { user_id: user.id } })
        const { product_name, product_discription, product_price, product_discount, product_brand, product_colour, category, return_policy } = req.body
        if(!product_name || !product_discription || !product_price || !product_discount || !product_brand || !product_colour || !category){
            return response(res, statusCodes.NOT_FOUND, "Please enter product_name, product_discription, product_price, product_discount, product_brand, product_colour, category")
        }
        if (category !== "Mobiles" && category !== "Electronics" && category !== "Fashion" && category !== "Home" && category !== "Kitchen") {
            return response(res, statusCodes.BAD_REQUEST, "Not found");
        }
        const add = await Add_Product.create({
            user_id: userId,
            product_name,
            product_discription,
            product_price,
            product_discount,
            product_brand,
            product_colour,
            category,
            return_policy: "5 Day"
        })
        if(add){
            return response(res, statusCodes.SUCCESS, "Product add successfully", add)
        } else{
            return response(res, statusCodes.SERVER_ERROR, "Server error")
        }
    }catch(err){
        console.log(err);
    }
}


const getProduct = async(req, res) => {
    try{
        const userId = req.headers.userId;
        const user = await User.findOne({ where: { id: userId } });
        
        if(!user){
            return response(res, statusCodes.NOT_FOUND, "User not found");
        }

        const products = await Add_Product.findAll({ where: { user_id: user.id } });
        
        if(products.length === 0){
            return response(res, statusCodes.NOT_FOUND, "Product not found");
        } else {
            return response(res, statusCodes.SUCCESS, "Products get successfully", products);
        }
    }catch(err){
        console.log(err);
        return response(res, statusCodes.SERVER_ERROR, "Server error");
    }
}


const productUpdate = async(req, res) => {
    try{
        const { user_id,product_name, product_discription, product_price, product_discount, product_brand, product_colour, category } = req.body;
        if(!product_name || !product_discription || !product_price || !product_discount || !product_brand || !product_colour || !category){
            return response(res, statusCodes.NOT_FOUND, "Please enter product_name, product_discription, product_price, product_discount, product_brand, product_colour, category")
        } 
        let userId = req.headers.userId;
        const user = await User.findOne({ where: { id: userId } });
        if(!user){
            return response(res, statusCodes.NOT_FOUND, "User not found")
        }
        const userid = req.params.id;
        if(!userid){
            return response(res, statusCodes.NOT_FOUND, "Please enter your id")
        }
        const product = await Add_Product.findOne({ where: { user_id: user.id, id: userid } });
        
        if(!product){
            return response(res, statusCodes.NOT_FOUND, "Product not found or userid is wrong");
        }
        
        const result = await Add_Product.update({ user_id: userId, product_name, product_discription, product_price, product_discount, product_brand, product_colour, category },{
            where: { id: userid }
        });
        if(result){
            return response(res, statusCodes.SUCCESS, "Product updated successfully", result);
        } else{
            return response(res, statusCodes.SERVER_ERROR, "Server error")
        }
    }catch(err){
        console.log(err);
    }
}

const productDelete = async(req, res) => {
    try{
        let id = req.params.id;
        let userId = req.headers.userId;

        const user = await Add_Product.findOne({ where: { id, user_id: userId } });
        if(user){
            const result = await Add_Product.destroy({
                where: {
                    id,
                    user_id: userId
                }
            });
            return response(res, statusCodes.SUCCESS, "Product delete successfully", user)
        }else{
            return response(res, statusCodes.NOT_FOUND, "Product not found")
        }
    }catch(err){
        console.log(err);
    }
}

const homeScreen = async (req, res) => {
    try {
        const products = await Add_Product.findAll();
        
        if (products.length === 0) {
            return response(res, statusCodes.NOT_FOUND, "Product not found");
        } 

        const add = await Promise.all(products.map(product => 
            Home.create({
                product_id: product.id,
                product_name: product.product_name,
                product_discription: product.product_discription,
                product_price: product.product_price,
                product_discount: product.product_discount,
                product_brand: product.product_brand,
                product_colour: product.product_colour,
                category: product.category,
                return_policy: "5 Day"
            })
        ));
        const addedProducts = await Home.findAll();

        return response(res, statusCodes.SUCCESS, "Products get successfully", addedProducts);
        
    } catch (err) {
        console.log(err);
        return response(res, statusCodes.ERROR, "Something went wrong");
    }
};


const details = async(req, res) => {
    try {
        const userid = req.params.id;
        const userId = req.headers.userId;

        if (!userId) {
            return response(res, statusCodes.NOT_FOUND, "Token add");
        }

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return response(res, statusCodes.NOT_FOUND, "User not found");
        }
        console.log(user.id)

        const product = await Add_Product.findOne({ where: { user_id: user.id } });
        if (!product) {
            return response(res, statusCodes.NOT_FOUND, "Product not found");
        }
        const home = await Home.findOne({ where: { id: userid } });s
        if(!home){
            return response(res, statusCodes.NOT_FOUND, "Home screen product not found");
        }
        console.log(home)
        

        const add = await Detail.create({
            product_id: home.product_id,
            product_name: home.product_name,
            product_discription: home.product_discription,
            product_price: home.product_price,
            product_discount: home.product_discount,
            product_brand: home.product_brand,
            product_colour: home.product_colour,
            category: home.category,
            return_policy: "5 Day"
        });

        if (add) {
            return response(res, statusCodes.SUCCESS, "Product add successfully", add);
        } else {
            return response(res, statusCodes.SERVER_ERROR, "Server error");
        }
    } catch (err) {
        console.log(err);
        return response(res, statusCodes.SERVER_ERROR, "Server error");
    }
}

const cart = async(req, res) => {
    try {
        const userId = req.headers.userId;
        if (!userId) {
            return response(res, statusCodes.NOT_FOUND, "Token add");
        }

        let { quantity } = req.body;
        if (!quantity) {
            quantity = 1;
        }
        const tax = 0;

        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return response(res, statusCodes.NOT_FOUND, "User not found");
        }

        const products = await Add_Product.findAll({ where: { user_id: user.id } });
        if (products.length === 0) {
            return response(res, statusCodes.NOT_FOUND, "Products not found");
        }

        const productIds = products.map(product => product.id);
        const details = await Detail.findAll({ where: { product_id: productIds } });
        if (details.length === 0) {
            return response(res, statusCodes.NOT_FOUND, "Details not found");
        }

        const cartItems = [];
        for (let i = 0; i < details.length; i++) {
            const add = await Cart.create({
                details_id: details[i].id,
                product_name: details[i].product_name,
                product_price: details[i].product_price,
                product_discount: details[i].product_discount,
                quantity
            });
            cartItems.push(add);
        }

        if (cartItems.length > 0) {
            return response(res, statusCodes.SUCCESS, "Cart added successfully", cartItems);
        } else {
            return response(res, statusCodes.SERVER_ERROR, "Server error");
        }

    } catch (err) {
        console.log(err);
        return response(res, statusCodes.SERVER_ERROR, "Server error");
    }
};




module.exports = { signUp, login, changePassword, productAdd, getProduct, productUpdate, productDelete, homeScreen, details, cart }