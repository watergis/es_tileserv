#!/bin/bash

ogr2ogr -progress -lco INDEX_NAME=osm_building_narok -lco BULK_SIZE=5000000 -f "Elasticsearch" http://localhost:9200 osm_building_narok.geojson -skipfailures
