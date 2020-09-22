const { UsersService } = require("./users.service");
const publicRoutes = [
    '/users/sign-in',
    '/users/sign-up'
]

module.exports.authMiddleware = async (req, res, next) => {
    //check if needed auth
    if(publicRoutes.find(route => route === req.originalUrl)) {
        return next();
    }
    try {
        const user = await UsersService.getUserByToken(req.headers.token);
        if(!user) {
            res.status(401);
            return res.send('Not authorized');
        }
        req.user = user;
        return next();
    } catch (e) {
        res.status(401);
        res.send(e);
        return next();
    }

}
