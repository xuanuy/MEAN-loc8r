var index = require('./main');
var querystring = require('querystring');

var locations = [{
    id: "01",
    name: 'Starcups',
    address: '125 High Street, Reading, RG6 1PS',
    rating: 3,
    facilitiesTitle: " Opening hours",
    facilities: ['Hot drinks', 'Food', 'Premium wifi'],
    distance: '100m',
    openingHoursTitle: " Opening hours",
    openingHours: [
        "Monday - Friday : 7:00am - 7:00pm",
        "Saturday : 8:00am - 5:00pm",
        "Sunday : closed"
    ],
    longitude: 10.8558625,
    latitude: 106.633304,
    customerReviews: [{
        rating: 5,
        author: "Simon Holmes",
        timestamp: "16 July 2013",
        comment: "What a great place. I can't say enough good things about it."
    }, {
        rating: 3,
        author: "Charlie Chaplin",
        timestamp: "16 June 2013",
        comment: "It was okay. Coffee wasn't great, but the wifi was fast."
    }]
}, {
    id: "02",
    name: 'Cafe Hero',
    address: '125 High Street, Reading, RG6 1PS',
    rating: 4,
    facilitiesTitle: " Opening hours",
    facilities: ['Hot drinks', 'Food', 'Premium wifi'],
    distance: '200m',
    openingHoursTitle: " Opening hours",
    openingHours: [
        "Monday - Friday : 7:00am - 7:00pm",
        "Saturday : 8:00am - 5:00pm",
        "Sunday : closed"
    ],
    longitude: 10.8297126,
    latitude: 106.6226396,
    customerReviews: [{
        rating: 5,
        author: "Simon Holmes",
        timestamp: "16 July 2013",
        comment: "What a great place. I can't say enough good things about it."
    }, {
        rating: 3,
        author: "Charlie Chaplin",
        timestamp: "16 June 2013",
        comment: "It was okay. Coffee wasn't great, but the wifi was fast."
    }]
}, {
    id: "03",
    name: 'Burger Queen',
    address: '125 High Street, Reading, RG6 1PS',
    rating: 2,
    facilitiesTitle: " Opening hours",
    facilities: ['Food', 'Premium wifi'],
    distance: '250m',
    openingHoursTitle: " Opening hours",
    openingHours: [
        "Monday - Friday : 7:00am - 7:00pm",
        "Saturday : 8:00am - 5:00pm",
        "Sunday : closed"
    ],
    longitude: 10.8043699,
    latitude: 106.6362217,
    customerReviews: [{
        rating: 5,
        author: "Simon Holmes",
        timestamp: "16 July 2013",
        comment: "What a great place. I can't say enough good things about it."
    }, {
        rating: 3,
        author: "Charlie Chaplin",
        timestamp: "16 June 2013",
        comment: "It was okay. Coffee wasn't great, but the wifi was fast."
    }]
}];

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