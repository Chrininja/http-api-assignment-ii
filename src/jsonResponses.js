// JSON responses
const users = {}; // Users object

// Respond JSON
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  response.write(JSON.stringify(object));
  response.end();
};

// JSON Meta
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });
  response.end();
};

// Not Found 404
const notFound = (request, response) => {
  const responseObj = {
    id: 'notFound',
    message: 'The page you are looking for is not found',
  };

  // 404
  if (request.method === 'GET') {
    return respondJSON(request, response, 404, responseObj);
  }

  return respondJSONMeta(request, response, 404);
};

// Get Users
const getUsers = (request, response) => {
  const responseJSON = {
    users,
  };

  // JSON Respond if GET
  // Otherwise respond with meta
  if (request.method === 'GET') {
    respondJSON(request, response, 200, responseJSON);
  } else {
    respondJSONMeta(request, response, 200);
  }
};

// Add User
const addUser = (request, response, body) => {
  const responseJSON = {
    message: 'Name and age are both required',
  };

  // Will return a bad request if the parameters are insufficient
  if (!body.name || !body.age) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let statusCode = 201; // create

  // No response 204
  if (users[body.name]) {
    statusCode = 204;
  } else {
    users[body.name] = {};
  }

  // Set the name and age for the json object
  users[body.name].name = body.name;
  users[body.name].age = body.age;

  // If 201, it will result in a success in JSON
  // Otherwise respond in Meta
  if (statusCode === 201) {
    responseJSON.message = 'created successfully';
    return respondJSON(request, response, statusCode, responseJSON);
  }

  return respondJSONMeta(request, response, statusCode);
};

// Export functions
module.exports = {
  notFound,
  getUsers,
  addUser,
};
