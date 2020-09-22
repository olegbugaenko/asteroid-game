const { uuid } = require('uuidv4');
const bcrypt = require('bcrypt');
const { ColonyStatusService } = require('@modules/colony/colony-status.service');
const db = require("@database");

class UsersService {

    static async createUser({
        email,
        firstName,
        lastName,
        password
    }) {
        const encrypted = await bcrypt.hash(password, 10);
        const code = uuid();
        const colony = await ColonyStatusService.createNewColony();
        const user = await db().model('User').create({
            email,
            firstName,
            lastName,
            password: encrypted,
            code,
            colonyCode: colony.code,
        });
        return {user, colony};
    }

    static async checkLogin({password, email}) {
        const user = await db().model('User').findOne({
            email,
        }).lean();
        if(!user) {
            throw new Error(`User with such email not found`);
        }
        const result = await bcrypt.compare(password, user.password);
        if(!result) {
            throw new Error(`Wrong password provided`);
        }
        return user;
    }

    static async generateToken(code) {
        const token = uuid();
        const expiry = new Date();
        expiry.setTime((new Date()).getTime() + 3600*24*1000);
        return db().model('User').findOneAndUpdate({
            code,
        },{
            token: {
                token,
                generatedAt: new Date(),
                expiredAt: expiry,
            }
        },{new: true});
    }

    static async register(data) {
        const {
            user,
            colony
        } = await UsersService.createUser(data);
        if(!user) {
            throw new Error('Unable to create user');
        }
        return UsersService.generateToken(user.code);
    }

    static async signin(data) {
        const user = await UsersService.checkLogin(data);
        if(!user) {
            throw new Error('User not found');
        }
        return UsersService.generateToken(user.code);
    }

    static async getUserByToken(token) {
        return db().model('User').findOne({
            'token.token': token,
            'token.expiredAt': {
                $gte: new Date(),
            }
        })
    }
}

module.exports = {
    UsersService,
}
