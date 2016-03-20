var Pages = {
  home: function(req, res) {
    res.render('pages/index', {connected: req.session.nbcooking});
  },
  about: function(req, res) {
    res.render('pages/index', {title: 'About'});
  },
  cgu: function(req, res) {
    res.render('pages/index', {title: 'CGU'});
  }
};

module.exports = Pages;