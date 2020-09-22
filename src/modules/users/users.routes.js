const { UsersController } = require('./users.controller');

module.exports = (app) => {
    app.put('/users/sign-in', UsersController.signIn);
    app.post('/users', UsersController.signUp);
}
