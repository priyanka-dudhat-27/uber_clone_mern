
const userModel = require('../models/user.model');
const { validationResult } = require('express-validator');
const userService = require('../services/user.service');
const blackListedTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const isUserExists = await userModel.findOne({ email });

  if (isUserExists) {
    return res.status(400).json({ errors: ['User already exists'] });
  }

  const { fullName, email, password } = req.body;

  try {
    const hashPassword = await userModel.hashPassword(password);

    const user = await userService.createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword
    });

    const token = user.generateToken();
    res.status(201).json({ token, user });
  } catch (error) {
    next(error);
  }
};

module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try{
    
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = user.generateToken();

  res.cookie('token', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  res.status(200).json({ token, user });
  }
  catch(error){
    next(error);
  }
}

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    const token=req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(token){
        await blackListedTokenModel.create({token});
        res.clearCookie('token');
    }
    res.status(200).json({message:'Logged out successfully'});
}