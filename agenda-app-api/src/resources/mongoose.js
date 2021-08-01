const mongoose = require('mongoose');
const toJson = require('@meanie/mongoose-to-json');

module.exports = app => {
    mongoose.connect(`mongodb://${process.env.mongoDbServer}/${process.env.mongoDbDatabase}`,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })

    mongoose.plugin(toJson);

    return mongoose;
}