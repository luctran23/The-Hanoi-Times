var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var newsRoute = require('./routes/news.route');
var app = express();
var port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.get('/', function(req, res){
    res.render('homePage')
});
app.use('/news', newsRoute);


app.listen(port, () => console.log(`This app is listening at http://localhost:${port}`));