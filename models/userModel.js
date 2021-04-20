const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name.'],
    maxlength: [40, 'Your name can only have 40 characters.'],
    minlength: [3, 'Your name must have more than 3 characters.'],
  },
  email: {
    type: String,
    required: [true, 'You must enter an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email address.'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'Please enter a Password'],
    minlength: [8, 'Your password must have more than 8 characters.'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please enter a Password'],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords don't match",
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (jwtTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    //console.log(changedTimestamp, jwtTimestamp);
    return jwtTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 599,
// });

// testTour
//   .save()
//   .then((document) => console.log(document))
//   .catch((err) => console.log(`Error: ${err}`));

module.exports = User;
