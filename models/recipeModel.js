const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    unique: true,
  },
  activeTime: {
    type: Number,
    required: [true, 'Please enter a time in minutes'],
  },
  cookTime: {
    type: Number,
    required: [true, 'Please enter a time in minutes'],
  },
  servings: {
    type: Number,
    required: [true, 'Please enter the number of servings'],
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
  ingredients: [
    {
      name: {
        type: String,
        required: [true, 'Please enter an ingredient'],
      },
      quantity: {
        type: Number,
        required: [true, 'Please enter an amount for your ingredient'],
      },
      weight: {
        type: String,
        required: [true, 'Please enter a weight for your ingredient'],
      },
    },
  ],
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
});

const Recipe = mongoose.model('Recipe', recipeSchema);

// const testRecipe = new Recipe({
//   name: 'Chicken Curry',
//   activeTime: 30,
//   cookTime: 90,
//   servings: 4,
//   difficulty: 'Easy',
//   ingredients: [
//   {
//      name: 'chicken',
//      quantity: 4,
//      weight: 'lbs'
//   },
//  {
//      name: 'garlic',
//      quantity: 6,
//      weight: 'cloves'
//   },
//  {
//      name: 'cumin seeds',
//      quantity: 2,
//      weight: 'tsps'
//   },
//  summary: 'This is a recipe summary',
//  description: 'This is a recipe description',
//  imageCover: 'header-image.jpg',
//  images: [
//  'pic-01.jpg',
//  'pic-02.jpg',
//  'pic-03.jpg'
//  ],
// });

// testRecipe
//   .save()
//   .then((document) => console.log(document))
//   .catch((err) => console.log(`Error: ${err}`));

module.exports = Recipe;
