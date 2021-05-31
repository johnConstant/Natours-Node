const express = require('express');
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
} = require('../controllers/usersController');
const {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,
  updatePassword,
  restrictTo,
} = require('../controllers/authenticationController');
const { protect } = require('../controllers/authenticationController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout);

router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// Because middleware runs in sequence any routes after this middleware will be protected
router.use(protect);

router.get('/my-account', getMe, getUser);
router.patch('/update-my-password/', updatePassword);
router.patch('/update-my-account/', updateMe);
router.delete('/delete-my-account/', deleteMe);
// Because middleware runs in sequence any routes after this middleware will be restricted
router.use(restrictTo('admin'));

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
