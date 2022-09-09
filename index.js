// See https://nodejs.dev/en/learn/build-an-http-server/ and
// https://developer.mozilla.org/en-US/docs/Learn/Server-side/Node_server_without_framework

const http = require('http');
const fs = require('fs');

const hostname = 'localhost';
const port = 8080;

const server = http.createServer((request, response) => {

    if (request.url === '/exit') {
      console.log("Exiting NodeJS server");
      process.exit();
    }

    let filePath = `.${request.url}`;

    if (filePath === './') {
      filePath = './index.html';
    }

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          fs.readFile('./404.html', (error, content) => {
            response.statusCode = 404;
            response.setHeader('Content-Type', 'text/html');
            response.end(content, 'utf-8');
          })
        } else {
          response.statusCode = 500;
          response.setHeader('Content-Type', 'text/plain');
          response.end(`Sorry, check with the site admin for error: ${error.code} ..\n`)
        }
      } else {
        response.statusCode = 200;
        response.setHeader('Content-Type', 'text/html');
        response.end(content, 'utf-8')
      }
    })
  })

server.listen(port, hostname, () => {
  console.log(`Server successfully started at http://${hostname}`)
})