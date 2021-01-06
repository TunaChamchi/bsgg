const mongoose = require('mongoose');
const { logger } = require("../config/logConfig");

const MONGO_URL = 'mongodb://192.168.0.155:27017/bsgg'

module.exports = () => {
    const connect = () => {
        mongoose.connect(MONGO_URL, {
            dbName: 'bsgg',
        }, (error) => {
            if (error) {
                logger.error('mongo fail' + error);
            }
        });
    };
    connect();

    mongoose.connection.on('error', (error) => {
        logger.error('mongo fail' + error);
    });
    mongoose.connection.on('disconnected', (error) => {  
        logger.error('mongo disconnected' + error);
        connect();
    });

    mongoose.set('useFindAndModify', false);

    require('./rank');
    require('./rankStat');
    require('./user');
    require('./userStat');
    require('./match');
    require('./characterStat');
    require('./characterTier');
};