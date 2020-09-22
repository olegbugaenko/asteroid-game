const path = require('path');
const fs = require('fs');
//joining path of directory

module.exports  = async (mongoose) => {
    const models = {};
    const directoryPath = path.join(__dirname, 'schema');
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            }
            files.forEach(function (file) {
                const model = require(`@database/models/schema/${file}`)(mongoose);
                Object.assign(models, model);
            });
            return resolve(models);
        });
    })

}

