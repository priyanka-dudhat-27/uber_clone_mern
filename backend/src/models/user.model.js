const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [2, 'First name must be at least 2 characters long']
    },
    lastName: {
      type: String,
      required: true,
      minlength: [2, 'Last name must be at least 2 characters long']
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/.+@.+\..+/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  socketId: {
    type: String
  }
});

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

userSchema.methods.generateToken = function() {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET,{expiresIn:'24h'});
};

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
