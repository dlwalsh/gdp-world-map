/*eslint-env node */

var fs = require('fs');
var path = require('path');
var iconv = require('iconv-lite');
var parse = require('csv-parse');
var async = require('async');
var request = require('request');

var firstRow = 5; // row of first country entry
var lastRow = 196; // row after last country entry

var codeColumn = 0;
var countryColumn = 3;
var gdpColumn = 4;

// Country GDP data CSV file
var spreadsheet = path.resolve(__dirname, '../assets', 'GDP.csv');

async.waterfall([

    function (callback) {
        // Open file and read its contents
        fs.readFile(spreadsheet, 'utf8', callback);
    },

    function (contents, callback) {
        parse(contents, callback);
    },

], function (error, result) {

    if (error) {
        throw error;
    }

    var rows = result.slice(firstRow, lastRow).reduce(function (set, row) {
        var code = row[codeColumn];
        set[code] = {
            name: row[countryColumn].trim(),
            gdp: row[gdpColumn].trim()
        };
        return set;
    }, {});

    var url = 'https://opendata.socrata.com/resource/mnkm-8ram.json';

    request(url, function (err, response, body) {

        var data, coords, final;

        if (err || response.statusCode !== 200) {
            throw 'Bad geocode result';
        }

        data = JSON.parse(body);

        if (!data || data.length === 0) {
            throw 'Missing data';
        }

        coords = data.reduce(function (set, entry) {
            set[entry.alpha_3_code] = {
                lat: entry.latitude_average,
                lng: entry.longitude_average
            };
            return set;
        }, {});

        final = Object.keys(rows).map(function (key) {
            return Object.assign(rows[key], coords[key], { code: key });
        });

        console.log(JSON.stringify(final));

    });


});
