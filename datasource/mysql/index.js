var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var _ = require('lodash');
var app = express();


var mysql      = require('mysql');
var connection =  mysql.createConnection({
  host     : 'mysql',
  user     : 'statsd',
  password : '2uhyenoi2y0',
  database : 'statsd_db'
});

app.use(morgan('combined'))

app.use(bodyParser.json());

var timeserie = [
	{'target': 's1', 'datapoints':  [ [0,0], [1,0], [2,0], [3,0], [4,0] , [5,0], [6,0] , [7,0], [8,0], [9,0], [10,0], [11,0], [12,0], [13,0], [14,0], [15,0]]},
	{'target': 's2', 'datapoints':  [ [15,0], [14,0], [13,0], [12,0], [11,0] , [10,0], [9,0] , [8,0], [7,0], [6,0], [5,0], [4,0], [3,0], [2,0], [1,0], [0,0]]},
	{'target': 's3', 'datapoints':  [ [0,0], [1,0], [2,0], [3,0], [4,0] , [5,0], [6,0] , [7,0], [8,0], [9,0], [10,0], [11,0], [12,0], [13,0], [14,0], [15,0]]},
	{'target': 's4', 'datapoints':  [ [15,0], [14,0], [13,0], [12,0], [11,0] , [10,0], [9,0] , [8,0], [7,0], [6,0], [5,0], [4,0], [3,0], [2,0], [1,0], [0,0]]},
	{'target': 's5', 'datapoints':  [ [0,0], [1,0], [2,0], [3,0], [4,0] , [5,0], [6,0] , [7,0], [8,0], [9,0], [10,0], [11,0], [12,0], [13,0], [14,0], [15,0]]},
	{'target': 's6', 'datapoints':  [ [15,0], [14,0], [13,0], [12,0], [11,0] , [10,0], [9,0] , [8,0], [7,0], [6,0], [5,0], [4,0], [3,0], [2,0], [1,0], [0,0]]}
	]; //require('./series');

var now = Date.now();

for (var i = timeserie.length -1; i >= 0; i--) {
  var series = timeserie[i];
  var decreaser = 0;
  for (var y = series.datapoints.length -1; y >= 0; y--) {
    series.datapoints[y][1] = Math.round((now - decreaser) /1000) * 1000;
    decreaser += 50000;
  }
}

var annotation = {
  name : "annotation name",
  enabled: true,
  datasource: "generic datasource",
  showLine: true,
}

var annotations = [
  { annotation: annotation, "title": "Donlad trump is kinda funny", "time": 1450754160000, text: "teeext", tags: "taaags" },
  { annotation: annotation, "title": "Wow he really won", "time": 1450754160000, text: "teeext", tags: "taaags" },
  { annotation: annotation, "title": "When is the next ", "time": 1450754160000, text: "teeext", tags: "taaags" }
];

var now = Date.now();
var decreaser = 0;
for (var i = 0;i < annotations.length; i++) {
  var anon = annotations[i];
  anon.time = (now - decreaser);
  decreaser += 1000000
}

var table =
  {
    columns: [{text: 'Time', type: 'time'}, {text: 'Country', type: 'string'}, {text: 'Number', type: 'number'}],
    values: [
      [ 1234567, 'SE', 123 ],
      [ 1234567, 'DE', 231 ],
      [ 1234567, 'US', 321 ],
    ]
  };
  
function setCORSHeaders(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST");
  res.setHeader("Access-Control-Allow-Headers", "accept, content-type");  
}


var now = Date.now();
var decreaser = 0;
for (var i = 0;i < table.values.length; i++) {
  var anon = table.values[i];

  anon[0] = (now - decreaser);
  decreaser += 1000000
}

app.all('/', function(req, res) {
  setCORSHeaders(res);
  res.send('https://grafana.com/plugins/grafana-simple-json-datasource\n');
  res.end();
});

app.all('/search', function(req, res){
  setCORSHeaders(res);
  var result = [];

  connection.query('SELECT `name` FROM `gauges_statistics` GROUP BY `name` ORDER BY `name`', function(err, rows, fields) {
  if (err) throw err;
	  _.each(rows, function(ts) {
		  result.push(ts.name);
	  });
	  res.json(result);
	  res.end();
  });

});

/**
 * Este metodo no esta implementado.
 */
//app.all('/annotations', function(req, res) {
//  setCORSHeaders(res);
//  console.log(req.url);
//  console.log(req.body);
//
//  res.json(annotations);
//  res.end();
//})

app.all('/query', function(req, res){
  setCORSHeaders(res);
  console.log(req.url);
  console.log(req.body);

  var tsResult = [];
  //connection.query('SELECT `name` FROM `gauges_statistics` GROUP BY `name` ORDER BY `name`', function(err, rows, fields) {
  //if (err) throw err;
  //        _.each(rows, function(ts) {
  //      	  result.push(ts.name);
  //        });
  //        res.json(result);
  //        res.end();
  //});

  var from = new Date(req.body.range.from);
  var to = new Date(req.body.range.to);
  var from_str = from.getTime();
  var to_str = to.getTime();
  var names = _.map(req.body.targets, function(t){
	return t.target
	console.log(t);
  });
console.log('(timestamp BETWEEN ' + from_str +' AND ' + to_str + ') AND ');
  var sql = 'SELECT * FROM `gauges_statistics` WHERE (`name` IN ("' + names.join('", "')  + '")) ORDER BY timestamp ASC';
	  console.log(sql);
	  connection.query(sql, function(err, rows, fields) {
		var result = {};
		_.each(rows, function (d){
			if(!(d.name in result)){
				result[d.name] = new Array();
                        }
			(result[d.name]).push([d.value, 1000 * d.timestamp]);
                });

		_.each(_.keys(result), function (d){
			var data = {target: d};
			console.log(d, result[d]);
			data['datapoints'] = result[d];
			tsResult.push(data);
		});

		res.json(tsResult);
		res.end();

  });
  //_.each(req.body.targets, function(target) {
  //  if (target.type === 'table') {
  //    //tsResult.push(table);
  //  } else {
  //    //var k = _.filter(timeserie, function(t) {

  //    //  console.log(req.body.range);
  //    //  return t.target === target.target;
  //    //});

  //    //_.each(k, function(kk) {
  //    //  tsResult.push(kk)
  //    //});
  //  }
  //});

});

app.listen(8000);

console.log("Server is listening to port 8000");
