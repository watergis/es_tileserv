#!/bin/bash

ogr2ogr -progress -lco INDEX_NAME=africa_rwanda_building -lco BULK_SIZE=5000000 -f "Elasticsearch" http://localhost:9200 africa_rwanda_building.geojson -skipfailures
ogr2ogr -progress -lco INDEX_NAME=africa_rwanda_poi -lco BULK_SIZE=5000000 -f "Elasticsearch" http://localhost:9200 africa_rwanda_poi.geojson -skipfailures