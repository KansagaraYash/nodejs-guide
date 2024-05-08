const http = require('http');
const routes = require('./routes');

// const server = http.createServer(function(req, res){
//     // console.log(req.url, req.method, req.headers);    
// })


const server = http.createServer(routes.handler)

console.log(routes.someText);

server.listen(5000);

