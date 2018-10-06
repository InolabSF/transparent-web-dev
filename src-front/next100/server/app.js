var app = require('http').createServer(handler);
var io = require('socket.io').listen(app);
var fs = require('fs');
const url = require('url');
const port = process.env.PORT || 8888;

app.listen(port, () => {
    console.log(`port = ${port}`);
});

function handler(req, res) {
    console.dir(req.url);
    var url_parse = url.parse(req.url, true);
    if (url_parse['search'] && url_parse['search'].indexOf('?_=') == 0) {
        res.writeHead(200, {
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*'
        });
        var query = url_parse.query['_'];
        console.log(query);
        res.write(query);
        res.end();
        io.emit('emit_from_server', query);
        return;
    }

    var path = __dirname + req.url;
    if (req.url.length == req.url.lastIndexOf('/') + 1) {
        path += 'index.html';
    }
    fs.readFile(path, function (err, data) {
        if (err) {
            res.writeHead(500);
            return res.end('Error');
        }
        res.writeHead(200);
        res.write(data);
        res.end();
    })
}

io.sockets.on('connection', function (socket) {
    socket.on('emit_from_client', function (data) {
        console.log(data);
        socket.emit('emit_from_server', '[{"type":"msg","txt":"websocket による接続を確認しました。"}]');
    });
});
