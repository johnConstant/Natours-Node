const express = require('express');
const {
  //   checkId,
  //   checkBody,
  getAllTours,
  createATour,
  getATour,
  updateATour,
  deleteATour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
} = require('../controllers/toursController');
const {
  protect,
  restrictTo,
} = require('../controllers/authenticationController');
const reviewRouter = require('../routes/reviewRoutes');

const router = express.Router();

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createAReview);
router.use('/:tourId/reviews', reviewRouter);
// router.param('id', checkId);
router.route('/top-5-cheapest').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(protect, getAllTours).post(createATour);
router
  .route('/:id')
  .get(getATour)
  .patch(updateATour)
  .delete(protect, restrictTo('admin'), deleteATour);

module.exports = router;
