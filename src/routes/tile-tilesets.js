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
  const tilesets = req.params.tilesets.split(',');
  const z = parseInt(req.params.z, 10);
  const x = parseInt(req.params.x, 10);
  const y = parseInt(req.params.y, 10);
  const ext = req.params.ext;
  if (ext != config.elasticsearch.extension) {
    throw {status: 400, message: `unsupported file extension: ${ext}`}
  }

  let files = [];
  tilesets.forEach(tileset => {
    let tileset_path = path.join(config.tilesets, `${tileset}.mbtiles`);
    if (!fs.existsSync(tileset_path)) {
      throw {status: 400, message: `Invalid tilesets name: ${tileset}`}
    }
    files.push(tileset_path);
  })

  let tiles = []
  for (let i = 0; i < files.length; i++) {
    let tile = await getTile(files[i], z, x, y);
    if (!tile) continue;
    tiles.push(tile);
  }
  
  if (req.query.indices){
    const indices = JSON.parse(req.query.indices);
    const es2mvt = new elastic2mvt(config.elasticsearch.url);
    const tile = await es2mvt.generate(z, x, y, indices);
    if (tile) {
      tiles.push(tile);
    }
  }

  if (tiles.length === 0) {
    throw {status: 404, message: `No tile`}
  }

  let buffer = tiles[0];
  if (buffer.length > 1) {
    buffer = await compositeTiles(tiles, z, x, y);
  }

  res.set('Content-Type', 'application/x-protobuf');
  res.set('Content-Encoding', 'gzip');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(buffer);
}