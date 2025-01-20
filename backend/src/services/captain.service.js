const captainModel = require('../models/captain.model');

module.exports.createCaptain = async ({
  email,
  password,
  firstName,
  lastName,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error('All fields are required');
  }
  const captain = captainModel.create({
    email,
    password,
    fullName: { firstName, lastName },
    vehicle: { color, plate, capacity, vehicleType },
  });
  return captain;
};
