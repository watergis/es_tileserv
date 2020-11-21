# es_tileserv
![GitHub](https://img.shields.io/github/license/JinIgarashi/es_tileserv)

This is a simple vector tile server which is served from Elasticsearch.

## Install

```
npm install
```

## Configuration
Edit `config.js` for your Elasticsearch tile API.

```js
elasticsearch: {
    url: 'localhost:9200', //change it to your Elasticsearch URL
    geometry: 'geom', //If geometry columnname of index is different name from 'geom', please specify here.
    extension: 'pbf' //If you want to use other file extenstion for vector tiles except 'pbf', please speficy here.
}
```

## Usage

```
# for debug
npm run dev

or
# for production
npm start
```

## API documentation

After runing the server, please access [http://localhost:8080/docs](http://localhost:8080/docs).

## Example
for web browser
```
http://localhost:8080/api/tile/14/9524/8269.pbf?indices=[{"name":"water_connection","geometry":"geom","query":{"term":{"connection_type":"Water Kiosk"}}},{"name":"pipeline","geometry":"geom","query":{"match_all":{}}},{"name":"wss","geometry":"geom","query":{"match_all":{}}}]
```

for curl
```
curl -X GET "http://localhost:8080/api/tile/14/9524/8269.pbf?indices=%5B%7B%22name%22%3A%22water_connection%22%2C%22geometry%22%3A%22geom%22%2C%22query%22%3A%7B%22term%22%3A%7B%22connection_type%22%3A%22Water%20Kiosk%22%7D%7D%7D%2C%7B%22name%22%3A%22pipeline%22%2C%22geometry%22%3A%22geom%22%2C%22query%22%3A%7B%22match_all%22%3A%7B%7D%7D%7D%2C%7B%22name%22%3A%22wss%22%2C%22geometry%22%3A%22geom%22%2C%22query%22%3A%7B%22match_all%22%3A%7B%7D%7D%7D%5D" -H  "accept: application/gzip"
```

## Test

```
npm test
```

## License

This source code is under `MIT license`.

---
`Copyright (c) 2020 Jin IGARASHI`
