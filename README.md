# us-census-api v0.0.4

    NodeJS interface for census.gov API. Currently only supports sf1 searching.
    Has all of the county and state FIPS codes available.

## Installation

    $ npm install us-census-api

## Coming Soon

    * Ability to search other data sets
    * Ability to search with 'H' codes
    * Zip-Code look-up

## Add Your API Key

    There are 2 days to pass your API key

    * Add your API key to the file 'lib/api_key.json'
    * Pass it as 'api_key' parameter

## Parameter Information
    
    You can search by state and county using either fips, 
      2 digit state code, or name
    You can use a wildcard (*) for state or county
    For population, you can just enter 'total', 'white', 'black',
      native american', 'asian', or 'hawaiian', or enter the 'P' code
      from the census.gov website.
    You can also just enter the 'get', 'for', and 'in' paramters directly
    You must enter the year, currently only 2010 is working

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
    year: 2010,                        // 2010 only works for now
    // api_key: 'YOUR_KEY_HERE',          // Optional, with configuration
    state: 'fl',                       // You can use the FIPS code, or the 2 digit state code
                                       //    or spell out the entire state
    county: 'pinellas',                // Spell out the county, or use the FIPS code
    population: 'total',               // Options for this: (or use P code from census API)
                                       //    total, white, black, native american, 
                                       //    asian, hawaiian

                                       // The following are configured when you
                                       //    use the state and county options
    // for: '',                           // Manage the 'for' parameter directly
    // get: '',                           // Manage the 'get' parameter directly
    // in: '',                            // Manage the 'in' parameter directly
    
};

census.sf1(params, callback);
```