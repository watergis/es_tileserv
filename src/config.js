require('dotenv').config();
const path = require('path');

module.exports = {
    elasticsearch: {
        url: process.env.ELASTICSEARCH_URL,
        extension: 'pbf'
    },
    tilesets: path.join(__dirname,'../tilesets')
}