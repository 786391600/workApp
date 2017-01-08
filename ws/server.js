var server = require('http').createServer()
    , url = require('url')
    , WebSocketServer = require('ws').Server
    , wss = new WebSocketServer({ server: server })
    , express = require('express')
    , app = express()
    , port = 8080;

app.get("/",function (req, res) {
    res.sendFile(__dirname+"/client.html");
});

var clients={

};
wss.on('connection', function connection(ws) {

    var location = url.parse(ws.upgradeReq.url, true);
    // you might use location.query.access_token to authenticate or share sessions
    // or ws.upgradeReq.headers.cookie (see http://stackoverflow.com/a/16395220/151312)
    ws.on('message', function(message) {

        var data=JSON.parse(message);
        clients[data.name]=ws;
        console.log(clients);
        for(var i in clients){
               if(i!==data.name){
                  clients[i].send(message);
               }
        }

    });


});

server.on('request', app);
server.listen(port)