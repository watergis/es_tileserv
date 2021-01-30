# es_tileserv
![GitHub](https://img.shields.io/github/license/watergis/es_tileserv)
![Docker Cloud Automated build](https://img.shields.io/docker/cloud/automated/gis4water/es_tileserv)
![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/gis4water/es_tileserv)

This is a simple vector tile server which is served from Elasticsearch.

## Install

```
npm install
```

## Configuration
copy `.env.example` to `.env`
```
cp .env.example .env
```

Edit `config.js` for your Elasticsearch tile API.

```js
elasticsearch: {
    url: process.env.ELASTICSEARCH_URL, //change it to your Elasticsearch URL
    extension: 'pbf' //If you want to use other file extenstion for vector tiles except 'pbf', please speficy here.
},
tilesets: path.join(__dirname,'../tilesets') //specify folder path which stores your mbtiles.
```

## Usage

```
# for debug
npm run dev

or
# for production
npm start
```

## Run on pm2
First, please install `pm2` globally if you don't install it yet.
```
sudo npm install -g pm2
```

```
# start server
# for development
npm run pm2:dev

# for production
npm run pm2:prod

# stop server
npm run pm2:stop
```

## Run on docker-compose together with Elasticsearch

```
# build docker image in local
npm run docker:build

# Or, you can pull the latest Docker image from Docker hub
docker pull gis4water/es_tileserv:latest

# start pm2 on docker
npm run docker:start
```

After running it on docker, please create index on Elasticsearch. The below is an example how to create index by ogr2ogr.

```
ogr2ogr -f "Elasticsearch" -lco NOT_ANALYZED_FIELDS={ALL} -lco INDEX_NAME=water_connection -lco OVERWRITE=YES http://localhost:9200 "PG:host='localhost' port=5432 user='postgres' dbname='rwss_assets' password='your password'" water_connection -skipfailures
```

## Insert sample data for test
some building data from OSM in Narok town, Kenya will be inserted as following commands.

```
$ cd sample-data
$ ./insert_test_data.sh

$ ogrinfo ES:http://localhost:9200

INFO: Open of `ES:http://localhost:9200'
      using driver `Elasticsearch' successful.
1: osm_building_narok (Multi Polygon)
```

## API documentation

After runing the server, please access [http://localhost:8080/docs](http://localhost:8080/docs).

## Example
for web browser
```
http://localhost:8080/api/tile/14/9824/8241.pbf?indices=[{"name":"osm_building_narok","geometry":"geometry","query":{"term":{"building":"school"}}}]
```

for curl
```
curl -X GET "http://localhost:8080/api/tile/14/9824/8241.pbf?indices=%5B%7B%22name%22%3A%22osm_building_narok%22%2C%22geometry%22%3A%22geometry%22%2C%22query%22%3A%7B%22term%22%3A%7B%22building%22%3A%22school%22%7D%7D%7D%5D" -H  "accept: application/gzip"
```

## Test

```
npm test
```

Note. this test case can't work without installing sample test data of Narok town in Kenya.

## License

This source code is under `MIT license`.

---
`Copyright (c) 2020 Jin IGARASHI`
