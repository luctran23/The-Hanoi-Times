var express = require('express');
var low = require('lowdb');
var bodyParser = require('body-parser');
var shortid = require('shortid');

var FileSync = require('lowdb/adapters/FileSync');
var adapter = new FileSync('db.json');

var db = low(adapter);
db.defaults({news: [] })
.write();

var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('homePage')
});

app.get('/news', function(req, res){
    res.render('news/allNews', {
        news: db.get('news').value()
    })
});

app.get('/news/search', function(req, res){
    var q = req.query.q;
    var matchesNews = db.get('news').value().filter(function(item){
        return item.title.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    });
    res.render('news/allNews', {
        news: matchesNews
    })
});
app.get('/news/create', function(req, res) {
    res.render('news/create');
});



app.get('/news/:id', function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value(); 
    res.render('news/view', {
        news: aNews
    })
});

app.get('/news/:id/delete', function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value();
    var remainNews = db.get('news').splice(db.get('news').indexOf(aNews), 1).value();
    res.redirect('/news');
});
app.get('/news/:id/modify', function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value();
    res.render('news/modify', {
        news: aNews
    });
});
app.post('/news/:id/modify', function(req, res) {
    var id =  req.params.id;
    var aNews = db.get('news').find({ id: id}).value();
    aNews.title = req.body.title;
    aNews.description = req.body.description;
    res.redirect('/news');
})
app.post('/news/create', function(req, res) {
    req.body.id = shortid.generate();
    db.get('news').push(req.body).write();
    res.redirect('/news');
});

app.listen(port, () => console.log(`This app is listening at http://localhost:${port}`));