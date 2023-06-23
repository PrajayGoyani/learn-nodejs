
const port = 3000;
const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  response.end('Hello, World!');
});

server.listen(port, _ => console.log(`Server running on port ${port}`) );
