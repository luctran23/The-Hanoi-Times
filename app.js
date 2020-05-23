var express = require('express');
var low = require('lowdb');
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

app.get('/', function(req, res){
    res.render('homePage')
});

app.get('/news', function(req, res){
    res.render('news/allNews', {
        news: db.get('news')
    })
});

app.get('/news/search', function(req, res){
    var q = req.query.q;
    var matchesNews = db.get('news').value().filter(function(item){
        return item.title.toLowerCase().indexOf(q) !== -1;
    })
});
app.listen(port, () => console.log(`This app is listening at http://localhost:${port}`));