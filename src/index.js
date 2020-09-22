require('module-alias/register');
const express = require("express");
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const db = require("@database");
const { authMiddleware } = require('@modules/users/users.middleware');
app.use(bodyParser.json());
app.use(cors());
app.use(authMiddleware);
const { routes } = require('@modules');
db({
    connectionString: "mongodb://localhost/asteroid-alpha"
}).connect().then(() => {
    app.get("/", function(request, response){
        response.send("<h2>Привет Express!</h2>");
    });
    routes(app);
    app.listen(3000);
})

