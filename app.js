const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const hostname = '0.0.0.0';
const port = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.js':   'application/javascript',
  '.css':  'text/css',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.json': 'application/json',
  '.ico':  'image/x-icon',
  '.wasm': 'application/wasm',
};

const server = http.createServer((req, res) => {
  let urlPath = req.url;

  if (urlPath === '/card' || urlPath === '/card/') {
    urlPath = '/card.html';
  } else if (urlPath === '/') {
    urlPath = '/index.html';
  }

  const filePath = path.join(__dirname, 'dist', urlPath);
  const ext = path.extname(filePath);
  const contentType = mimeTypes[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) {
      fs.readFile(path.join(__dirname, 'dist', 'index.html'), (err2, fallback) => {
        if (err2) { res.statusCode = 404; res.end('Not Found'); return; }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        res.end(fallback);
      });
      return;
    }
    res.statusCode = 200;
    res.setHeader('Content-Type', contentType);
    res.end(data);
  });
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});