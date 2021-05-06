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

router.use(protect);

router
  .route('/')
  .get(getAllReviews)
  .post(restrictTo('admin', 'user'), setTourUserIds, createAReview);

router
  .route('/:id')
  .get(getAReview)
  .patch(restrictTo('admin', 'user'), updateAReview)
  .delete(restrictTo('admin', 'user'), deleteAReview);

module.exports = router;
