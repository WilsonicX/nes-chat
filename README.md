## Test for Hapijs/Nes
Testing the new WebSocket adapter for hapijs by [**Eran Hammer**](https://github.com/hueniverse)

## Serving html page
Very simple server using [**hapijs**](https://www.npmjs.com/package/hapi) and [**inert**](https://www.npmjs.com/package/inert) for loading html content. Because I do not want to use [**browserify**](https://www.npmjs.com/package/browserify).
for this i had to save the the [**client.js**](https://github.com/hapijs/nes/blob/master/lib/client.js) in a separate file **assets/client.js** and loaded to the index.html page.
```js
var client = new nes.Client("ws://localhost:4000/chat");
client.connect(function(err){

});
```

## Using the broadcast to send message to all users

```js
    server.broadcast("welcome everybody!!!");
```
