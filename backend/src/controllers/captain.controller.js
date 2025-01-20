const captainModel = require('../models/captain.model');
const { validationResult } = require('express-validator');
const captainService = require('../services/captain.service');

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
