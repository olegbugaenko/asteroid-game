const { UsersService } = require('./users.service');

class UsersController {

    static async signUp(req, res) {
        try {
            console.log('req.body', req.body);
            const result = await UsersService.register(req.body && req.body.data);
            res.send(result);
        } catch (e) {
            console.error(e);
            res.status(400);
            return res.send(e && e.message);
        }
    }

    static async signIn(req, res) {
        try {
            console.log(req.body);
            const result = await UsersService.signin(req.body);
            res.send(result);
        } catch (e) {
            console.error(e);
            res.status(400);
            return res.send(e && e.message);
        }
    }

}

module.exports.UsersController = UsersController;
