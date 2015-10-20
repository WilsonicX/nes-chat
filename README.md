## Test for Hapijs/Nes
Testing the new WebSocket adapter for hapijs by [**Eran Hammer**](https://github.com/hueniverse)

## Serving html page
Very simple server using [**hapijs**](https://www.npmjs.com/package/hapi) and [**inert**](https://www.npmjs.com/package/inert) for load html content. Because I do not want to use [**browserify**](https://www.npmjs.com/package/browserify),
for this i had to save the the [**client.js**](https://github.com/hapijs/nes/blob/master/lib/client.js) in a separate file **assets/client.js** and loaded to the index.html page.
```js
var client = new nes.Client("ws://localhost:4000/chat");
client.connect(function(err){

});
```
i'm also loading a very simple main.css file that i found on the internet.

## Using the broadcast to send message to all users

```js
    server.broadcast("welcome everybody!!!");
```

The way we're geting the brodcast message to all the user is very simple, just appending the messege argument to DOM, we're using jquery to append the message
```js
client.onUpdate = function(update){
    console.log(update)
    $("#messages").append($("<li>").text(update));
}
```

## User sending message from the client to the server
The documentation is showing us the method for this process **client.message(message, callback)**, from a user perpective they only need to type message and press submit, code is also simple
```js
client.message($("#m").val());

```
we're using jquery to grab the value from the input text on the Browser

## Register the Nes plug-in
We're creating options values, with the broadcast and publish options, after we need to register the Nes module and load the options.
```js
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

server.register([
        {
            register:Nes,
            options:options
        }
```
## Declares a subscription
The path must begin with the '/' and we need to set the path where the ws is called
```js
server.subscription("/chat");
```

## Future plans
- `Users accounts` - Create a user accounts module for the chat
- `Validating Message` - Right now is sending white space to the server and to all the users
- `Private messages` - Send private message to a specific user
