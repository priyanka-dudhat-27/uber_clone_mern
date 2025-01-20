const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');
const blackListedTokenModel = require('../models/blacklistToken.model');

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, password, vehicle } = req.body;

  const isCaptionExists = await captainModel.findOne({ email });

  if (isCaptionExists) {
    return res.status(400).json({ errors: ['Captain already exists'] });
  }

  try {
    const hashPassword = await captainModel.hashPassword(password);
    const captain = await captainService.createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password:hashPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });

    const token = captain.generateToken();

    res.status(201).json({ token, captain });
  } catch (error) {
    next(error);
  }
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;

  try {
    const captain = await captainModel.findOne({ email }).select("+password");
    if (!captain) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordMatch = await captain.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = captain.generateToken();
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({ token, captain });
  } catch (error) {
    next(error);
  }
};

module.exports.getCaptainProfile = async (req, res, next) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        next(error);
    }       
}

module.exports.logoutUser = async (req, res, next) => {
    try {
        const token= req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(token){
            await blackListedTokenModel.create({token});
            res.clearCookie('token');
        }
        res.status(200).json({message:'Logged out successfully'});
    } catch (error) {
        next(error);
    }
}
