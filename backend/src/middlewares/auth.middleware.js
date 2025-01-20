const blackListedTokenModel = require('../models/blacklistToken.model'); 
const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Check if the token is blacklisted
    const isBlacklisted = await blackListedTokenModel.findOne({ token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized: Token is blacklisted' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized: User not found' });
        }
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};
