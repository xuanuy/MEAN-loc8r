module.exports.about = function (req, res) {
    res.render('generic-text', {
        title: 'About Loc8r',
        // todo: parse html
        aboutUs: "Loc8r was created to help people find places to sit down and get a bit of work done." +
        "<br/><br/>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sed lorem ac nisi dignissim accumsan."
    });
};