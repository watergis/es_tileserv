const elastic2mvt = require('elastic2mvt');
const config = require('../config');

module.exports = async(req, res, next)=>{
  const z = parseInt(req.params.z, 10);
  const x = parseInt(req.params.x, 10);
  const y = parseInt(req.params.y, 10);
  const ext = req.params.ext;
  if (ext != config.elasticsearch.extension) {
    throw {status: 400, message: `unsupported file extension: ${ext}`}
  }
  if (!req.query.indices){
    throw {status: 400, message: `please spefify indices for searching`}
  }
  
  const indices = JSON.parse(req.query.indices);

  console.log(z,x,y,JSON.stringify(indices))
  const es2mvt = new elastic2mvt(config.elasticsearch.url);
  const buffer = await es2mvt.generate(z,x,y,indices)

  res.set('Content-Type', 'application/x-protobuf');
  res.set('Content-Encoding', 'gzip');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Origin', '*');
  res.send(buffer);
}