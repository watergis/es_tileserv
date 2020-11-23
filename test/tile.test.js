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
    it('/14/9824/8241.pbf', (done)=>{
        const z = 14;
        const x = 9824;
        const y = 8241;
        const ext = 'pbf'
        const indices = [
            {
                "name": "osm_building_narok",
                "geometry": "geometry",
                "query": {
                    "term": {
                        "building": "school"
                    }
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