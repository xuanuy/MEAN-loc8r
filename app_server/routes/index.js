var express = require('express');
var router = express.Router();
var ctrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

/* Home page */
router.get('/', ctrlMain.index);

/* Locations pages */
router.get('/location/[0-9a-z]{1,}', ctrlLocations.locationInfo);
router.get('/locations', ctrlLocations.homelist);
router.get('/location/review/new/[0-9a-z]{1,}', ctrlLocations.addReviewForm);
router.get('/location/review/add/[0-9a-z]{1,}', ctrlLocations.addReview);

/* Other pages */
router.get('/about', ctrlOthers.about);

module.exports = router;