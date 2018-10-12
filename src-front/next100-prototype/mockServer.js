// PORT=8888 node mockServer.js
var server = require('ws').Server;
var s = new server({port: process.env.PORT});

s.on('connection', (ws) => {

  ws.on('message', (message) => {
    s.clients.forEach((client) => {
      client.send(message);
    });
  });

  ws.on('close', () => {
    console.log('I lost a client');
  });
});
