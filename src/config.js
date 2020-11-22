require('dotenv').config();

module.exports = {
    elasticsearch: {
        url: process.env.ELASTICSEARCH_URL,
        geometry: 'geom',
        extension: 'pbf'
    }
}