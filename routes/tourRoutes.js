const express = require('express');
const {
  getAllTours,
  createATour,
  getATour,
  updateATour,
  deleteATour,
} = require('../controllers/toursController');

const router = express.Router();
router.route('/').get(getAllTours).post(createATour);
router.route('/:id').get(getATour).patch(updateATour).delete(deleteATour);

module.exports = router;
