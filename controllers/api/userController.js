const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../model');
const Users = db.users
const {
    PASSWORD_HASH_SALT_ROUNDS,
    JSON_TOKEN_SECRET
} = process.env



const userRegister = async (req, res) => {
    try {

        let { firstName, middleName, lastName, email, password, userRole } = req.body;
        const user_data = await Users.findOne({
            where: {
                email: email
            }
        });
        /* Checking if user already exist */
        if (user_data != null) {
            return res.status(400).send({
                success: false,
                data: [],
                message: "Email id exist"
            })
        }
        /* Checking if user already exist */

        const hashed_password = await bcrypt.hash(password, parseInt(PASSWORD_HASH_SALT_ROUNDS));
        
        let userCreate_data = {
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            email: email,
            password: hashed_password,
            userRole: userRole,
        }

        await Users.create(userCreate_data);

        res.status(200).send({
            success: true,
            data: {
                firstName: userCreate_data.firstName,
                middleName: userCreate_data.middleName,
                lastName: userCreate_data.lastName,
                email: userCreate_data.email,
                role: userCreate_data.userRole,
            },
            message: "Successfully Signed Up"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: []
        })
    }
}

const userLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user_data = await Users.findOne({
            where: {
                email: email
            }
        });

        // Check if user exists
        if (!user_data) {
            return res.status(400).send({
                success: false,
                data: [],
                message: "Email or password is incorrect"
            });
        }

        // Compare provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user_data.password);

        if (!isMatch) {
            return res.status(400).send({
                success: false,
                data: [],
                message: "Email or password is incorrect"
            });
        }

        let token = jwt.sign({
            fullName: user_data.fullName,
            email: user_data.email,
            password: user_data.password,
            role: user_data.userRole,
        },
            JSON_TOKEN_SECRET,
            {
                expiresIn: 86400, // 24 Hrs
                algorithm: "HS256"
            }
        )

        res.status(200).send({
            success: true,
            data:
            {
                token: token,
                fullName: user_data.fullName,
                email: user_data.email,
                userRole: user_data.userRole
            },
            message: "Successfully Signed In"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: error.message,
            data: []
        })
    }
}
module.exports = {
    userLogin,
    userRegister
};