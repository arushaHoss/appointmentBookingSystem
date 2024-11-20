const jwt = require("jsonwebtoken")
const { validationResult } = require("express-validator");
const db = require('../model');
const Users = db.users
require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');


const {
JSON_TOKEN_SECRET,
} = process.env;




const verifyToken = async (req, res, next)=>{
    let authHeader = req.headers['authorization']

    if(!authHeader){
        return res.status(403).send({
            success: false,
            message: "No Token Provided",
            data: req.headers.Accesstoken
        })
    }

    let token = authHeader.split(' ')[1];
    
    jwt.verify(token, JSON_TOKEN_SECRET, async (err, decoded)=>{
        if (err) {
            return res.status(401).send({
                success: false,
                message: "Unauthorized!",
                data: []
            })  
        }
        else{
            const user_data = await Users.findOne({where: {email: decoded.email}});
            /* Checking if user already exist */
                if(user_data == null){
                    return res.status(400).send({
                        success: false,
                        data: [],
                        message: "No account found"
                    }) 
                }

                req.user_data = user_data,

            next();
        }
    })
}
const validateApiData = async(req, res, next)=>{
    /* Form Validation */
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        let msg = "";
        errors.array().forEach((e)=>{
            msg += e.msg+", "
        })
        return res.status(422).send({
            success: false,
            message: msg,
            data: []
        })
    }
    else{
        next();
    }
}



module.exports = {
    verifyToken,
    validateApiData
}

