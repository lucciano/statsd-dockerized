{
	"backends" : [ 
	//	"./backends/console" ,
		"./backends/mongodb"
		],
	"server" : "./servers/udp",
	"address" : "0.0.0.0",
	"port": 8125,
		"debug" : false,
	"deleteGauges":   true,
	"deleteTimers":   true,
	"deleteSets" :    true,
	"deleteCounters": true,

	"mongoHost": 'mongodb',
	"mongoPort": 27017,
	"mongoMax": 2160, 
	"mongoPrefix": false, 
	"mongoName": 'statsd'
}
