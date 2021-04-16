const mongoose = require('mongoose');
const validator = require('validator');

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
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please enter a Password'],
    minlength: [8, 'Your password must have more than 8 characters.'],
  },
});

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
