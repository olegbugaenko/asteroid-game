const ColonyRouter = require('./colony/colony.routes');
const UsersRouter = require('./users/users.routes');

module.exports.routes = (app) => {
    ColonyRouter(app);
    UsersRouter(app);
}
