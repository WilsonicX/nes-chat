// global properties
var Hapi   = require("hapi");
var Inert  = require("inert");
var Nes    = require("nes");
var server = new Hapi.Server();
// server connections
server.connection({
    host:"localhost",
    port:4000
});
// options for using the socket on this app
var options = {
    onConnection:function(socket){
        // sendint message to the client
        socket.send("welcome everybody");
    },
    onMessage:function(socket, message, next){
        console.log(message);
        server.broadcast(message);
    }
}
// pluginf registers
server.register([
        {
            register:Inert,
            options:{}
        },
        {
            register:Nes,
            options:options
        }
    ],
    function(err){
        // check if there is an error
        if(err) throw err;
        // creating the route, to serve static content the index.html page and the javasript file, to not use the browserfy module
        server.route([
            {
                method:"GET",
                path:"/chat",
                handler:function(request, reply){
                    reply.file("index.html");
                }
            },
            {
                method:"GET",
                path:"/assets/{params*}",
                handler:{
                    directory:{
                        path:"./assets",
                        listing:false,
                        index:true
                    }
                }
            }
        ]);
        // starting the server
        server.start(function(){
            console.log("server starting at:" + server.info.uri);

        });
});
