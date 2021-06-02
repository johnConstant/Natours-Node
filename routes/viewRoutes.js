const express = require('express');
const {
  getOverview,
  getTour,
  getLoginForm,
  getAccount,
} = require('../controllers/viewController');
const {
  isLoggedIn,
  protect,
} = require('../controllers/authenticationController');

const router = express.Router();

router.get('/my-account', protect, getAccount);

router.use(isLoggedIn);

router.get('/all-tours', getOverview);
router.get('/tour/:slug', getTour);
router.get('/login', getLoginForm);
// router.post('/submit-user-data', protect, updateUserData);
module.exports = router;
