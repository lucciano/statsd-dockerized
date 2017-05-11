{
	"backends" : [ 
		"./backends/console","./backends/repeater"
		],
	"server" : "./servers/udp",
	"address" : "0.0.0.0",
	"port": 8125,
	"debug" : true,
	"deleteGauges":   true,
	"deleteTimers":   true,
	"deleteSets" :    true,
	"deleteCounters": true,
	"nodes": [
		{host: 'backend_mysql', port: 8125},
		{host: 'backend_mongodb', port: 8125}
	]
}
