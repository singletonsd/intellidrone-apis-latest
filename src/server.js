'use strict';

var http = require('http');
var app = require('./app');

const normalizePort = require('normalize-port');

var serverPort = normalizePort(process.env.PORT || '8080');
app.use('port', serverPort);

// Start the server
http.createServer(app).listen(serverPort, function () {
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
  });