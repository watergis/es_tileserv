const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
var app = require('../src/app');

describe('healthcheck test', ()=>{
    it('ok', (done)=>{
        request(app).get(`/healthcheck`).expect(200).end(done);
    })
})

const base_url = '/api/tile';

describe('tile api test', ()=>{
    it('/14/9524/8269.pbf', (done)=>{
        const z = 14;
        const x = 9524;
        const y = 8269;
        const ext = 'pbf'
        const indices = [
            {
                "name": "water_connection",
                "geometry": "geom",
                "query": {
                    "term": {
                        "connection_type": "Water Kiosk"
                    }
                }
            },
            {
                "name": "pipeline",
                "geometry": "geom",
                "query": {
                    "match_all": {}
                }
            },
            {
                "name": "wss",
                "geometry": "geom",
                "query": {
                    "match_all": {}
                }
            }
        ]
        const url = `${base_url}/${z}/${x}/${y}.${ext}?indices=${JSON.stringify(indices)}`;
        request(app)
        .get(url)
        .expect(200)
        .end(done);
        })
})