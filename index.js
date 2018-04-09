//NodeJS
var express = require('express');
var app = express();
var http = require('http').Server(app);
var fs = require('fs');
var io = require('socket.io')(http);
var path=require('path')


app.get('/', function(req,res){
  res.sendFile(__dirname + '/image.html')
})

io.on('connection', function(socket){

  let readStream = fs.createReadStream(path.resolve(__dirname, './image.jpg'), {encoding: 'binary'})
  let chunks = []
  let delay = 10

  readStream.on('readable', ()=>{
    console.log('image loading')
  })

  readStream.on('data', (chunk)=>{
    chunks.push(chunk)
    io.emit('img-chunk',chunk)
  })

  readStream.on('end', ()=>{
    console.log('image loaded')
  })

})

http.listen(3000, function(){
  console.log('listening on *:3000');
});
