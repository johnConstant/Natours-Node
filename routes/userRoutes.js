const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
} = require('../controllers/authenticationController');
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
