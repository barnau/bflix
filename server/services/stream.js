var io = require('socket.io');
var ss = require('socket.io-stream');


var socket = io.connect('http://localhost:4200');
var stream = ss.createStream();