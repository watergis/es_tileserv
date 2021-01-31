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
    const z = 10;
    const x = 597;
    const y = 517;
    const ext = 'pbf'

    it('/14/9824/8241.pbf POI', (done)=>{
        
        const indices = [
            {
                "name": "africa_rwanda_poi",
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

    it('/14/9824/8241.pbf Building', (done)=>{
        
        const indices = [
            {
                "name": "africa_rwanda_building",
                "geometry": "geometry",
                "query": {
                    "term": {
                        "building": "church"
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

describe('Composite Tile API test', ()=>{
    it('/unvt/14/9824/8241.pbf', (done)=>{
        const z = 10;
        const x = 597;
        const y = 517;
        const ext = 'pbf'
        const indices = [
            {
                "name": "africa_rwanda_poi",
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