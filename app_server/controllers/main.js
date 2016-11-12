/* GET home page. */
var locations = require('./locations');
module.exports.index = function (req, res) {
    locations.homelist(req, res);
};