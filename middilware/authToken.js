 
const jwt = require('jsonwebtoken');

async function userDetails(req, res, next) {
    try {
        // Extract token from cookies
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found",
                error: true,
                success: false
            });
        }

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
            if (err) {
                console.log("error auth", err);
                return res.status(401).json({
                    message: "Invalid token",
                    error: true,
                    success: false
                });
            }

            // Attach the decoded payload to req.user
            req.user = decoded;
            next();
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}

module.exports = userDetails;