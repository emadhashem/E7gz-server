const app = require('./package.json')

module.exports = {
    openapi: "3.0.3",
    info: {
        version: `${app.version}`,
        title: "Swagger UI for E7GZ app",
        description: "This documentation for E7GZ application. Made by using nodejs, expressjs, typescript. For authorization, you have a token that can be obtained from the API login or after signup operation.",
        license: {
            name: "MIT",
            url: "https://openseource.org/licenses/MIT"
        }
    },
    servers: [
        {
            url: `http://localhost:${process.env.PORT}/api`,
            description: "Local server"
        },
    ],
    tags: [
        {
            name: "Auth",
            description: "User methods for interaction with user entity"
        },
        {
            name : 'Appoinment',
            description : 'Admin methods  for adding appoinment'
        }
    ],
    "paths": require('./swagger/path'),
    components: {
        schemas: require('./swagger/components'),
        securitySchemes: {
            Bearer: {
                type: "apiKey",
                in: "header",
                name: "authorization",
                description: ""
            }
        }
    }
}