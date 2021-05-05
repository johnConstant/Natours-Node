const Review = require('../models/reviewModel');
const {
  getAll,
  createOne,
  getOne,
  updateOne,
  deleteOne,
} = require('./handleFactory');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = getAll(Review);
exports.getAReview = getOne(Review);
exports.createAReview = createOne(Review);
exports.updateAReview = updateOne(Review);
exports.deleteAReview = deleteOne(Review);
