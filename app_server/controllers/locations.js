var index = require('./main');
var mongoose = require('mongoose');

var customerReviewScheme = new mongoose.Schema({
    rating: {type: Number, "default": 0, min: 0, max: 5},
    author: String,
    createdOn: {type: Date, "default": Date.now()},
    comment: String
});

var openingHourSchema = new mongoose.Schema({
    days: {type: String, required: true},
    opening: String,
    closing: String,
    closed: {type: Boolean, required: true}
});

var coordination = new mongoose.Schema({
    location: {
        type: Object,
        index: '2dsphere',
        label: 'MongoDB spesific coordinates field'
    },
    'location.type': {
        type: String,
        allowedValues: ['Point'],
        label: 'Typeof coordinates - Point'
    },
    'location.coordinates': {
        type: [Number],
        decimal: true,
        label: 'Array of coordinates in MongoDB style \[Lng, Lat\]'
    }
});

var locationScheme = new mongoose.Schema({
    id: String,
    name: {type: String, require: true},
    address: String,
    rating: {type: Number, "default": 0, min: 0, max: 5},
    facilitiesTitle: String,
    facilities: [String],
    distance: String,
    openingHoursTitle: String,
    openingHours: [openingHourSchema],
    coords: coordination,
    customerReviews: [customerReviewScheme]
});

mongoose.model('Location', locationScheme/*, 'Locations'*/);

var locations = mongoose.locations.find();

function getLocation(locationId) {
    var result = null;
    locations.forEach(function (location) {
        if (location.id === locationId) {
            result = location;
        }
    });
    return result;
}

module.exports.locationInfo = function (req, res) {
    var pathSeg = req.path.split("/");
    var locationId = pathSeg[pathSeg.length - 1];
    var location = getLocation(locationId);
    if (typeof location === "undefined" || location == null) {
        return index.index(req, res);
    }

    res.render('location-info', {
        title: 'Location info page',
        location: location,
        sidebar: "<p class=\"lead\">Simon's cafe is on Loc8r because it has accessible wifi and spaceto sit down with your laptop" +
        "and get some work done.</p>" +
        "<p>If you've been and you like it - or if you don't - please leave a review to help other people just like you.</p>"
    });
};

module.exports.addReviewForm = function (req, res) {
    var pathSeg = req.path.split("/");
    var locationId = pathSeg[pathSeg.length - 1];
    var location = getLocation(locationId);
    if (typeof location === "undefined" || location == null) {
        return index.index(req, res);
    }

    res.render('location-review-form', {
        title: 'Add review page',
        location: location
    });
};

module.exports.addReview = function (req, res) {
    var message = 'success', errorMessage = "";

    var pathSeg = req.path.split("/");
    var locationId = pathSeg[pathSeg.length - 1];
    var location = getLocation(locationId);
    if (typeof location === "undefined" || location == null) {
        message = 'fail';
        errorMessage = 'Error while get location';
    }

    res.render('location-review-form', {
        title: 'Add review page',
        location: location,
        message: message,
        errorMessage: errorMessage,
        author: req.param("name"),
        rating: req.param("rating"),
        comment: req.param("review")
    });
};

module.exports.homelist = function (req, res) {
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wifi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places to work with wifi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about." +
        " Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: locations
    });
};