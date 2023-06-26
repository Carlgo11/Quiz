/**
 * Module dependencies.
 */
var cookieSession = require('cookie-session')
var express = require('express')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path')
    , bodyParser = require('body-parser')
    , favicon = require('serve-favicon')
    , logger = require('morgan')
    , methodOverride = require('method-override');

var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
// app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(logger('dev'));
app.use(cookieSession({
    name: 'session',
    keys: [
        'token',
        'answers'],
    maxAge: 2 * 60 * 60 * 1000 // 2 hours
}))
app.use(bodyParser.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') == 'development') {
    app.locals.pretty = true;
}

app.get('/', routes.index);
app.get('/questions', routes.questions);
app.get('/register', routes.register_get);
app.post('/register', routes.register_post);

app.listen(3000, err => console.log(err ? 'Error listening' : 'Listening'))