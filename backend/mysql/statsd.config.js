{
	"backends" : [ 
		"./backends/console","/opt/nodejs-statsd-mysql-backend/mysql-backend"
		],
	"server" : "./servers/udp",
	"address" : "0.0.0.0",
	"port": 8125,
	"debug" : true,
	"deleteGauges":   true,
	"deleteTimers":   true,
	"deleteSets" :    true,
	"deleteCounters": true,

	mysql: { 
	     host: "mysql", 
	     port: 3306, 
	     user: "statsd", 
             password: "2uhyenoi2y0", 
	     database: "statsd_db",
	     backendPath : "/opt/nodejs-statsd-mysql-backend/", 
	     engines : {
		    counters: ["engines/countersEngine.js"],
		    gauges:   ["engines/gaugesEngine.js"],
		    timers:   ["engines/timersEngine.js"],
		    sets:     ["engines/setsEngine.js"]
	     }
        }
}
