const Tour = require('../models/tourModel');

const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
  // Get tour data
  const tours = await Tour.find();
  // Build template

  //Render Template using tour data
  res.status(200).render('overview', { title: 'All Tours', tours });
});

exports.getTour = (req, res) => {
  res.status(200).render('tour', { title: 'The Forest Hiker' });
};
