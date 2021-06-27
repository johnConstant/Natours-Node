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
  getToursWithin,
  getDistances,
  uploadTourImages,
  resizeTourImages,
} = require('../controllers/toursController');
const {
  protect,
  restrictTo,
} = require('../controllers/authenticationController');

const reviewRouter = require('./reviewRoutes');

const router = express.Router();

// router
//   .route('/:tourId/reviews')
//   .post(protect, restrictTo('user'), createAReview);
router.use('/:tourId/reviews', reviewRouter);
// router.param('id', checkId);
router.route('/top-5-cheapest').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMonthlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createATour);
router
  .route('/:id')
  .get(getATour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    uploadTourImages,
    resizeTourImages,
    updateATour
  )
  .delete(protect, restrictTo('admin'), deleteATour);

module.exports = router;
