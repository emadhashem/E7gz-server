/*
here u write the api-endpoint
*/

module.exports = {
    "/auth/register": require('./api/auth/register.json'),
    "/auth/login": require('./api/auth/login.json'),
    "/auth/logout" : require('./api/auth/logout.json'),
    "/appoinment/add" : require('./api/appoinment/add.json'),
    "/appoinment/get_appoinments_by_title" : require('./api/appoinment/getAppoinmetsByTitle.json'),
    "/appoinment/all" : require('./api/appoinment/getAllAppoinments.json'),
    "/appoinment/delete" : require('./api/appoinment/delete.json'),
    "/user/me" : require('./api/user/me.json')
}