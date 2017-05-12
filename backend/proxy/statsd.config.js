{
	"backends" : [ 
		"./backends/console","./backends/repeater"
		],
	"server" : "./servers/udp",
	"address" : "0.0.0.0",
	"port": 8125,
	"debug" : true,
        "repeater" : [
			{host: 'backend_mysql', port: 8125, adminport: 8126},
			{host: 'backend_mongodb', port: 8125, adminport: 8126}
		]
}
