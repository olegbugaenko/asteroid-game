const mongoose = require('mongoose');
const modelsLoader = require('./models');

class MongoConnector {

    constructor(options) {
        if(MongoConnector.instance) {
            return MongoConnector.instance;
        }
        this.connectionString = options.connectionString;
        this.isConnected = false;
        this.mongoose = mongoose;
        this.models = {}
        MongoConnector.instance = this;
    }

    async connect() {
        this.mongoose.connect(this.connectionString, {useNewUrlParser: true});
        return new Promise((resolve, reject) => {
            this.mongoose.connection.once('open', async () => {
                this.isConnected = true;
                this.models = await modelsLoader(this.mongoose);
                for(let model in this.models) {
                    if(this.models[model].onInit) {
                        await this.models[model].onInit();
                    }
                }
                console.log('Successfully connected: ', this.connectionString, this.models);
                return resolve();
            });
            this.mongoose.connection.on('error', console.error.bind(console, 'connection error:'));
        })

    }

    model(name) {
        if(!this.models[name]) {
            throw new Error(`Unable to find model ${name}`);
        }
        return this.models[name];
    }

}

module.exports = (options) => new MongoConnector(options);
