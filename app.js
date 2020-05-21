var express = require('express');

var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

app.get('/', function(req, res){
    res.render('homePage')
});

app.get('/news', function(req, res){
    res.render('news/allNews')
});

app.listen(port, () => console.log(`This app is listening at http://localhost:${port}`));