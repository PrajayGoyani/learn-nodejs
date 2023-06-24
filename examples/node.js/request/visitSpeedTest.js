'use strict';

const http = require('http');

// Function to make an HTTP request
function makeRequest(url, label) {
  console.time(label);
  const request = http.get(url, (response) => {
    // Consume response data (optional)
    response.on('data', () => {});

    // When response ends
    response.on('end', () => {
      console.timeEnd(label);
    });
  });

  // Error handling
  request.on('error', (error) => {
    console.error(`An error occurred while making the request (${label}):`, error);
    console.timeEnd(label);
  });
}

// 测试 baidu
(() => {
  makeRequest('http://www.baidu.com', 'b');
})();

// 测试 taobao
(() => {
  makeRequest('http://www.taobao.com', 'a');
})();

// 测试 qq
(() => {
  makeRequest('http://www.qq.com', 't');
})();



// 经过代码的修改和测试，发现在放在最后的一组请求总是最快的，比如现在的 qq, 用时最少
