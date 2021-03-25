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

const router = express.Router();

// router.param('id', checkId);
router.route('/top-5-cheapest').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);
router.route('/monthly-plan/:year').get(getMonthlyPlan);
router.route('/').get(getAllTours).post(createATour);
router.route('/:id').get(getATour).patch(updateATour).delete(deleteATour);

module.exports = router;
