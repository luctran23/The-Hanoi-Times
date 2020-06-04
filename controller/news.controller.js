var db = require('../db');
var shortid = require('shortid');

module.exports.app = function(req, res){
    res.render('news/allNews', {
        news: db.get('news').value()
    });
};

module.exports.search = function(req, res){
    var q = req.query.q;
    var matchesNews = db.get('news').value().filter(function(item){
        return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('news/allNews', {
        news: matchesNews
    })
};

module.exports.create = function(req, res) {
    res.render('news/create');
};
module.exports.view = function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value(); 
    res.render('news/view', {
        news: aNews
    })
};
module.exports.delete = function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value();
    var remainNews = db.get('news').splice(db.get('news').indexOf(aNews), 1).write();
    res.redirect('/news');
};

module.exports.modify = function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value();
    res.render('news/modify', {
        news: aNews
    });
};

module.exports.postModify = function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value();
    aNews.title = req.body.title;
    aNews.description = req.body.description;
    res.redirect('/news');
};

module.exports.postCreate = function(req, res) {
    req.body.id = shortid.generate();
    db.get('news').push(req.body).write();
    res.redirect('/news');
};