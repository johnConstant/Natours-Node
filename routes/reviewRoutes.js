const express = require('express');
const {
  getAllReviews,
  createAReview,
  deleteAReview,
  updateAReview,
  setTourUserIds,
  getAReview,
} = require('../controllers/reviewController');
const {
  protect,
  restrictTo,
} = require('../controllers/authenticationController');

const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(getAllReviews)
  .post(protect, restrictTo('admin', 'user'), setTourUserIds, createAReview);

router.route('/:id').get(getAReview).patch(updateAReview).delete(deleteAReview);

module.exports = router;
