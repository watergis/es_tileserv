require('dotenv').config();

module.exports = {
    elasticsearch: {
        url: process.env.ELASTICSEARCH_URL,
        extension: 'pbf'
    }
}