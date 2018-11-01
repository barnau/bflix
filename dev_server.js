var express = require('express'),
    // mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    api = require('./server/routes/api'),
    config = require('./server/config/database')
var passport = require('passport');
var session = require('express-session');
var mongoose = require('./server/config/connection');
var http = require('http');
var cors = require('cors')


//var db = mongoose.connect('mongodb://localhost/bookAPI', {useNewUrlParser: true})
// mongoose.Promise = require('bluebird');
// mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
//   .then(() =>  console.log('connection succesfull'))
//   .catch((err) => console.error(err));

var app = express();

var port = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// app.use(express.static(__dirname + '/dist/bflix'));



// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, Authorization, X-Requested-With, Content-Type, Accept");
//     next();
//   });

  app.use(cors({credentials: true, origin: true}));

  //app.set('view engine', 'jade');

app.use(session({secret: 'anything'})); // passport set up; npm install express-session

app.use(passport.initialize()) // passport set up
app.use(passport.session());

//app.use('/api', express.static(__dirname + '/dist/bflix'));
app.use('/api', api); 

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/dist/bflix'));
// });

app.get('/', (req, res) => {
    res.send('welcome to my api!');
});

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

//const server = http.createServer(app);

app.listen(port, () => {
    console.log('Gulp is running my app on PORT: ' + port)
});

// server.listen(port, () => {
//   console.log('Gulp is running my app on PORT: ' + port)
// });
