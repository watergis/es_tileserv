# es_tileserv
![GitHub](https://img.shields.io/github/license/JinIgarashi/es_tileserv)

This is a simple vector tile server which is served from Elasticsearch.

## Install

```
npm install
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
http://localhost:8080/api/tile/14/9524/8269.pbf?indices=["water_connection","pipeline","wss"]&geometry=geom&queries=[{"term":{"connection_type":"Water Kiosk"}},{},{}]
```

for curl
```
curl -X GET "http://localhost:8080/api/tile/14/9524/8269.pbf?indices=%5B%22water_connection%22%2C%22pipeline%22%2C%22wss%22%5D&geometry=geom&queries=%5B%7B%22term%22%3A%7B%22connection_type%22%3A%22Water%20Kiosk%22%7D%7D%2C%7B%7D%2C%7B%7D%5D" -H  "accept: application/gzip"
```

## License

This source code is under `MIT license`.

---
`Copyright (c) 2020 Jin IGARASHI`
