const userModel = require('../modules/userSchema');
const bcrypt = require('bcryptjs');

async function userRegisterController(req, res) {
    try {
        const { username, email, password, role, profilePicture } = req.body;

        // Validate required fields
        if (!email) throw new Error("Please provide email");
        if (!password) throw new Error("Please provide password");
        if (!username) throw new Error("Please provide username");
        if (!profilePicture) throw new Error("Please provide profilePicture");
        if (!role) throw new Error("Please provide role");

        // Check if user already exists
        const existingUser = await userModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            throw new Error("User with this email or username already exists");
        }

        // Hash the password
        const salt = bcrypt.genSaltSync(process.env.SALT);
        const hashPassword = bcrypt.hashSync(password, salt);

        if (!hashPassword) {
            throw new Error("Something went wrong while hashing the password");
        }

        // Create user payload
        const payload = {
            username, 
            email,
            password: hashPassword,
            profilePicture,  
            role,  
        };

        // Save user to database
        const userData = new userModel(payload);
        const saveUser = await userData.save();

        res.status(201).json({
            data: saveUser,
            message: "User created successfully",
            error: false,
            success: true,
        });
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
}

module.exports = userRegisterController;