
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , socketio = require('socket.io')
  , arduino = require('duino');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

var io = socketio.listen(http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
}));

io.set('log level', 1);

// arduino
var board = new arduino.Board({
  debug: false
});

var sensor = new arduino.Sensor({
  board: board,
  pin: 'A0'
});

io.sockets.on('connection', function (socket) {

  var previousValue = 0;

  sensor.on('read', function(err, value) {
    value = parseInt(value);
    var diff = Math.pow(previousValue - value, 2);
    if (diff > 4) {
      console.log(value + " >>> " + diff);
      previousValue = value;
      socket.emit('news', {A0: value});
    }
  });

  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });
});

