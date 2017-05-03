{
	"backends" : [ 
		"./backends/console" ,"mongo-statsd-backend/lib/index"
		],
	"server" : "./servers/udp",
	"address" : "0.0.0.0",
	"port": 8125,
	"debug" : true,
	"deleteGauges":   true,
	"deleteTimers":   true,
	"deleteSets" :    true,
	"deleteCounters": true,

	"mongoHost": 'mongodb',
	"mongoPort": 27017,
	"mongoMax": 2160, 
	"mongoPrefix": true, 
	"mongoName": 'statsd',
}
}
