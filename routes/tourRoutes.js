const express = require('express');
const {
  //   checkId,
  checkBody,
  getAllTours,
  createATour,
  getATour,
  updateATour,
  deleteATour,
} = require('../controllers/toursController');

const router = express.Router();

// router.param('id', checkId);
router.route('/').get(getAllTours).post(checkBody, createATour);
router.route('/:id').get(getATour).patch(updateATour).delete(deleteATour);

module.exports = router;
