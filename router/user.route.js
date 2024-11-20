var express = require("express");
var router = express.Router();

const { 
    validateApiData,
    verifyToken
} = require("../middleware/token.middleware");

const {
    userLogin,
    userRegister 
} = require("../controllers/api/userController");

const { 
    userRegisterValidate,
    userLoginValidate
} = require("../middleware/user.validator");

// Define user-related routes
router.post('/register', userRegisterValidate, validateApiData, userRegister);
router.get('/login', userLoginValidate, validateApiData, userLogin);

module.exports = router;
