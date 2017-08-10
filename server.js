// global properties
const Hapi   = require("hapi");
const Inert  = require("inert");
const Nes    = require("nes");
const server = new Hapi.Server();
// server connections
server.connection({
    host:"localhost",
    port:4000
});
// options for using the socket on this app
var options = {
    onConnection:function(socket){
        // sendint message to the client
        server.broadcast("welcome everybody!!!");
    },
    onMessage:function(socket, message, next){
        console.log(message);
        server.publish("/chat", message);
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
        // the server subscription path
        server.subscription("/chat");
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
