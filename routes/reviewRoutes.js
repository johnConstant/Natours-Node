const express = require('express');
const {
  getAllReviews,
  createAReview,
} = require('../controllers/reviewController');
const {
  protect,
  restrictTo,
} = require('../controllers/authenticationController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('admin', 'user'), createAReview);

module.exports = router;
