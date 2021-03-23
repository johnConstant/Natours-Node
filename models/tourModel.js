const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Please enter a max group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'Please enter a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'Please enter a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'Please enter a tour summary'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please enter a tour description'],
  },
  imageCover: {
    type: String,
    required: [true, 'A tour must have an image'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

// const testTour = new Tour({
//   name: 'The Park Camper',
//   price: 599,
// });

// testTour
//   .save()
//   .then((document) => console.log(document))
//   .catch((err) => console.log(`Error: ${err}`));

module.exports = Tour;
