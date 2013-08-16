# us-census-api

    NodeJS interface for census.gov API. Currently only supports sf1 searching.

## Installation

    $ npm install us-census-api

## Coming Soon

    Ability to search other data sets    

## Query Parameters
    
    You can search by state and county; using either fips, 2 letter code, or name
    You can use a wildcard (*) for state or county
    For population, you can just enter 'total', 'white', 'black', etc, 
    or use the "P" codes from census.gov developer API

## Example
```js
var census = require('us-census-api');

var callback = function (res) {
    var str = '';

    res.on('data', function(chunk) {
        str += chunk;
    });

    res.on('end', function() {
        console.log('Return: ' + str);
    });
};

var params = {
    year: 2010,
    population: 'total',
    api_key: 'YOUR_KEY_HERE',
    state: 'fl',
    county: 'pinellas'
};

console.log(census.sf1(params, callback));
```