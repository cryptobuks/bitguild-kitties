'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.io = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _socket3 = require('./socket');

var _socket4 = _interopRequireDefault(_socket3);

var _listener = require('./listener');

var _listener2 = _interopRequireDefault(_listener);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = _http2.default.Server(app);

var io = exports.io = (0, _socket2.default)(server);

// DB Setup
_mongoose2.default.connect(process.env.MONGODB_URI || 'mongodb://localhost/bitguild-kitties-db-alpha').catch(function (err) {
    return console.error(err);
});

_mongoose2.default.Promise = global.Promise;

// App Setup
app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.get('/', function (req, res) {
    return res.send('works');
});

app.use(function (err, req, res, next) {
    console.log('errrrr', err);
    res.status(500).send(err);
});

// Server Setup
var port = process.env.PORT || 8000;
server.listen(port, function () {
    console.log('>>> Server listening on ' + port);
});

// Socket Register
io.on('connection', function (sk) {
    console.log('>>> Socket connected');
    _socket4.default.register(sk);
    _listener2.default.start(sk);
});

// Expose API Route
app.use('/api', _api2.default);

// Listing to CryptoKitties on Ethereum
_listener2.default.start();
//# sourceMappingURL=index.js.map