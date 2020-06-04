var express = require('express');
var router = express.Router();
var controller = require('../controller/news.controller');

var db = require('../db');

var shortid = require('shortid');

router.get('/', controller.app);

router.get('/search', controller.search);
router.get('/create', function(req, res) {
    res.render('news/create');
});



router.get('/:id', function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value(); 
    res.render('news/view', {
        news: aNews
    })
});

router.get('/:id/delete', function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value();
    var remainNews = db.get('news').splice(db.get('news').indexOf(aNews), 1).write();
    res.redirect('/news');
});
router.get('/:id/modify', function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value();
    res.render('news/modify', {
        news: aNews
    });
});
router.post('/:id/modify', function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value();
    aNews.title = req.body.title;
    aNews.description = req.body.description;
    res.redirect('/news');
})
router.post('/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('news').push(req.body).write();
    res.redirect('/news');
});

module.exports = router;