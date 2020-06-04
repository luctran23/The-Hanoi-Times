var db = require('../db');

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
