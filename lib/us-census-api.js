/*!
 * us-census-api
 * Copyright 2013 Noah Keller <noahtkeller@gmail.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var
        http = require('http')
        , states = require('./states_info.json')
        , api_key = require('./api_key.json');

exports.sf1 = function(data, callback) {
    if (!data.api_key) {
        if (api_key.key === false) {
            throw 'No API Key entered.';
        } else {
            data.api_key = api_key.key;
        }
    }
    if (!callback && data.callback) {
        callback = data.callback;
    }
    if (typeof data.population !== 'undefined') {
        var po;
        if (data.population === 'total')
            po = 'P0010001';
        else if (data.population === 'white')
            po = 'P0030002';
        else if (data.population === 'black')
            po = 'P0030003';
        else if (data.population === 'native american')
            po = 'P0030004';
        else if (data.population === 'asian')
            po = 'P0030005';
        else if (data.population === 'hawaiian')
            po = 'P0030006';
        else if (data.population === 'other')
            po = 'P0030007';
        else if (data.population.match(/^P[0-9]{7}$/) !== null)
            po = data.population;
        else if (typeof data.population === 'object') {
            var p = data.population;
            if (p.byRace)
        }
        else
            throw 'Cannot compute population paramter!';
        data.get = po;
    }
    if (typeof data.state !== 'undefined') {
        var state = 'state:', stateo;
        if (data.state.match(/^\s*[a-zA-Z]\s*[a-zA-Z]\s*$/) !== null) {
            stateo = states[data.state.toUpperCase().replace(/\s*/g, '')];
            state += states[data.state.toUpperCase().replace(/\s*/g, '')].fips;
        } else if (data.state.match(/(\s|[a-zA-Z]+)/) !== null && typeof states[data.state.replace(/\s+/g, ' ').trim()] !== 'undefined') {
            state += states[data.state.replace(/\s+/g, ' ').trim()].fips;
            stateo = states[data.state.replace(/\s+/g, ' ').trim()];
        } else if (state === "*") {
            state += "*";
        } else {
            throw 'Cannot compute state';
        }
        if (typeof data.county === 'undefined') {
            data.for = state;
        } else {
            data.in = state;
            var county = 'county:';
            if (data.county.match(/\s*[0-9]+/) !== null) {
                county += data.county;
            } else if (data.county === '*') {
                county += data.county;
            } else if (typeof stateo.counties[data.county] !== 'undefined') {
                county += stateo.counties[data.county].fips;
            } else {
                throw 'Cannot compute county!';
            }
            data.for = county;
        }
    }
    if (
            typeof data.year === 'undefined' ||
            typeof data.api_key === 'undefined' ||
            typeof data.for === 'undefined' ||
            typeof data.get === 'undefined'
            ) {
        throw 'Missing parameters!';
    }
    http.request({
        host: 'api.census.gov',
        method: 'GET',
        path: '/data/' + data.year +
                '/sf1' +
                '?key=' + data.api_key +
                '&for=' + data.for +
                '&in=' + data.in +
                '&get=' + data.get
    }
    , callback).end();
};