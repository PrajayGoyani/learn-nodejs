const cron = require('node-cron');
const http = require('http');


http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
  res.end();
}).listen(3000, () => console.log('Server running on 3000...'));


// Cron Jobs
cron.schedule('* * * * *', () => {
  console.log('This function will run every minute');
});

cron.schedule('0 8-18/2 * * 1-5', () => {
  console.log('This function will run every weekday between 8 AM and 6 PM, every 2 hours');
});
