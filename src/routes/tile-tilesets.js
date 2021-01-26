const MBTiles = require('@mapbox/mbtiles');
const vtcomposite = require('@mapbox/vtcomposite');
const fs = require('fs');
const path = require('path');
const elastic2mvt = require('elastic2mvt');
const config = require('../config');

const getTile = (file, z, x, y) => {
  return new Promise((resolve, reject) => {
    new MBTiles(`${file}?mode=ro`, (err, mbtiles) => {
      if (err) reject(err);
      mbtiles.getTile(z, x, y, (err, data) => {
        if (err) {
          data = null;
        };
        resolve(data);
      })
    }); 
  })
}

const compositeTiles = (buffers, z, x, y) => {
  const zxy = { z, x, y };
  const tiles = buffers.map(buffer => { return { buffer, z, x, y } });
  const options = {
    compress: true,
    buffer_size: 0
  };
  return new Promise((resolve, reject) => {
    vtcomposite(tiles, zxy, options, function(err, result) {
      if (err) reject(err);
      resolve(result); 
    });
  })
}

module.exports = async (req, res, next) => {
  const tilesets = req.params.tilesets;
  const z = parseInt(req.params.z, 10);
  const x = parseInt(req.params.x, 10);
  const y = parseInt(req.params.y, 10);
  const ext = req.params.ext;
  if (ext != config.elasticsearch.extension) {
    throw {status: 400, message: `unsupported file extension: ${ext}`}
  }

  const tileset_path = path.join(config.tilesets, `${tilesets}.mbtiles`);
  if (!fs.existsSync(tileset_path)) {
    throw {status: 400, message: `Invalid tilesets name: ${tilesets}`}
  }
  let buffer = await getTile(tileset_path, z, x, y);
  if (req.query.indices){
    const indices = JSON.parse(req.query.indices);
    const es2mvt = new elastic2mvt(config.elasticsearch.url);
    const es_buffer = await es2mvt.generate(z, x, y, indices);
    if (es_buffer) {
      if (buffer) {
        buffer = await compositeTiles([buffer, es_buffer], z, x, y);
      } else {
        buffer = es_buffer;
      }
    }
  }

  if (!buffer) {
    throw {status: 404, message: `No tile`}
  }

  res.set('Content-Type', 'application/x-protobuf');
  res.set('Content-Encoding', 'gzip');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(buffer);
}