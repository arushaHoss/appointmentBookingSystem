const {body} = require("express-validator");

const userRegisterValidate = [
    body("firstName")
    .isString()
    .exists({checkFalsy:true})
    .withMessage("User first name Required"),
    body("lastName")
    .isString()
    .exists({checkFalsy:true})
    .withMessage("User lastName name Required"),
    body("email")
    .exists({checkFalsy:true})
    .withMessage("User email Required")
    .isEmail()
    .withMessage("Please provide valid email id"),
    body("password")
    .exists({checkFalsy:true})
    .withMessage("Password is required")
    .matches(/^(?=.*[!@#$%^&*])(?=.*[A-Z]).{8,}$/)
    .withMessage("Password must contain 8 characters or more, 1 uppercase, 1 special"),
    body("userRole")
    .exists({ checkFalsy: true })
    .withMessage("User role is required")
    .isIn(['patient', 'doctor'])
    .withMessage("User role must be either author, borrower or admin")
];

const userLoginValidate = [
    body("email")
    .exists({checkFalsy:true})
    .withMessage("User email Required")
    .isEmail()
    .withMessage("Please provide valid email id"),
    body("password")
    .exists({checkFalsy:true})
    .withMessage("Password is required")
];

module.exports = {
    userLoginValidate,
    userRegisterValidate
}