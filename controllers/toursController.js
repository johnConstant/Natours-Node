// const fs = require('fs');
const Tour = require('../models/tourModel');

// IMPORT TEST DATA AS JSON OBJECT
// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// Middleware
// exports.checkId = (req, res, next, val) => {
//   const id = req.params.id * 1;
//   const tour = tours.find((el) => el.id === id);
//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  if (!req.body.name || !req.body.price) {
    return res.status(404).json({
      status: 'Fail',
      message: 'Invalid data',
    });
  }
  next();
};

// Route Handlers
exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    // results: tours.length,
    // data: {
    //   tours: tours,
    // },
  });
};

exports.createATour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

exports.getATour = (req, res) => {
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour: tour,
  //   },
  // });
};

exports.updateATour = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour goes here>',
    },
  });
};

exports.deleteATour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
