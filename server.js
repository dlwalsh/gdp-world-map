/*eslint-env node */

var path = require('path');
var express = require('express');
var webpack = require('webpack');

var app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/data/:file', function(req, res) {
    res.sendFile(path.join(__dirname, 'data', req.params.file));
});

app.get('/dist/:file', function(req, res) {
    res.sendFile(path.join(__dirname, 'dist', req.params.file));
});

app.get('/leaflet/:file', function(req, res) {
    res.sendFile(path.join(__dirname, 'node_modules/leaflet/dist/images', req.params.file));
});

app.listen(3000, function (error) {

    if (error) {
        console.log(error);
        return;
    }

    console.log('Listening at http://localhost:3000');

});
