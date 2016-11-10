module.exports.locationInfo = function (req, res) {
    res.render('index', {title: 'Location info page'});
};

module.exports.addReview = function (req, res) {
    res.render('index', {title: 'Add review page'});
};