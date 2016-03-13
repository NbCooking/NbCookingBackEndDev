var Pages = {
  home: function(req, res) {
    res.render('pages/index', {title: 'Home'});
  },
  about: function(req, res) {
    res.render('pages/index', {title: 'About'});
  },
  cgu: function(req, res) {
    res.render('pages/index', {title: 'CGU'});
  }
};

module.exports = Pages;