var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index');
});

app.get('/move/:x/:y', function(req, res) {
  var x = req.params.x;
  var y = req.params.y;

  movePlayer(x, y);
  res.send('moved');
});

io.on('connection', function(socket) {
  console.log('user connected');
});

function movePlayer(x, y) {
  io.sockets.emit('move', x, y);
}

http.listen(port, function() {
  console.log('listening on port', port);
});
