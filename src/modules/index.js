const ColonyRouter = require('./colony/colony.routes');
const UsersRouter = require('./users/users.routes');
const QuestsRouter = require('./quests/quests.routes');

module.exports.routes = (app) => {
    ColonyRouter(app);
    UsersRouter(app);
    QuestsRouter(app);
}
