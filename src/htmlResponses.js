/* HTML and CSS elements here */
const fs = require('fs');
// File System Module
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// Index
const getIndex = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/html',
  });
  response.write(index);
  response.end();
};

// CSS
const getCSS = (request, response) => {
  response.writeHead(200, {
    'Content-Type': 'text/css',
  });
  response.write(css);
  response.end();
};

// Export
module.exports = {
  getIndex,
  getCSS,
};
