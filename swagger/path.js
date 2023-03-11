/*
here u write the api-endpoint
*/

module.exports = {
    "/auth/register": require('./api/auth/register.json'),
    "/auth/login": require('./api/auth/login.json'),
    "/auth/logout" : require('./api/auth/logout.json')
}