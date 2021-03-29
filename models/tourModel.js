const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please enter a name'],
      unique: true,
      maxlength: [40, 'Tour name can only have 40 characters.'],
      minlength: [5, 'Tour name must have more than 5 characters.'],
      //   validate: [validator.isAlpha, 'Tour name can only contain letters'],
    },
    slug: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Please enter easy, medium or hard',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be below 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'Please enter a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'The price is lower than the discounted price',
      },
    },
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
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE

// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({
    secretTour: {
      $ne: true,
    },
  });
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(docs);
  next();
});

// AGGREGATION MIDDLEWARE

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
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
