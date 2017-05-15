var nodeimu = require('nodeimu');
var IMU = new nodeimu.IMU();

var socket = require('socket.io-client')('http://math.seattleacademy.org:1500');
socket.on('connect', function(){
	console.log("connect");
	placeBot();
});
socket.on('drawAllBots', function(bots){
	console.log("drawAllBots",bots)

});
socket.on('disconnect', function(){
	console.log("disconnect");
});
var sensors = {};
sensors.counter = 0;
var counter = 0;
function placeBot(){
	var bot = {};
	bot.x = 300;
	bot.y = 200;
	bot.color = "pink";
	bot.r = 15;
	bot.theta = Math.random()* 360;

	IMU.getValue(function(err, data) {
        if (err) throw err;
        sensors = data;
        sensors.counter = counter++;
        bot.counter = counter;
        	socket.emit("postbot",bot);
    });
}

setInterval(placeBot,1000);

