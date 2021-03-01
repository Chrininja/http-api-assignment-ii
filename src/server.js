const http = require('http');
const url = require('url');
const query = require('querystring');
const responseHandler = require('./htmlResponses.js');
const objectHandler = require('./jsonResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// URL struct
const urlStruct = {
  '/': responseHandler.getIndex,
  '/style.css': responseHandler.getCSS,
  '/getUsers': objectHandler.getUsers,
  '/notReal': objectHandler.notFound,
  '/addUser': objectHandler.addUser,
  notFound: objectHandler.notFound,
  index: responseHandler.getIndex,
};

// Handle Get
const handleGet = (request, response, pUrl) => {
  if (urlStruct[pUrl.pathname]) {
    urlStruct[pUrl.pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

// Handle Head
const handleHead = (request, response, pUrl) => {
  if (urlStruct[pUrl.pathname]) {
    urlStruct[pUrl.pathname](request, response);
  } else {
    urlStruct.notFound(request, response);
  }
};

// Handle Post
const handlePost = (request, response, pUrl) => {
  if (pUrl.pathname === '/addUser') {
    const body = [];

    // Error
    request.on('error', (err) => {
      console.dir(err);
      response.statusCode = 400;
      response.end();
    });

    // Push data
    request.on('data', (chunk) => {
      body.push(chunk);
    });

    // Add User
    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      console.dir(bodyString);

      const bodyParams = query.parse(bodyString);

      objectHandler.addUser(request, response, bodyParams);
    });
  }
};

// On Request
const onRequest = (request, response) => {
  const pUrl = url.parse(request.url);

  // Handle depending on the type of request method
  if (request.method === 'POST') {
    handlePost(request, response, pUrl); // POST
  } else if (request.method === 'HEAD') {
    handleHead(request, response, pUrl); // HEAD
  } else {
    handleGet(request, response, pUrl); // GET
  }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
