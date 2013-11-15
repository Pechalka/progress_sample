var express = require('express')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

 var Faker = require('Faker');

var app = express();

var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname , '/../app')));



server.listen(3000, function(){
  console.log('Express server listening on port 3000');
});


var progress = 0;
app.post('/start', function(req, res){

	var timer = setInterval(function(){
		progress++;
		io.sockets.emit('progress', progress);
		if (progress == 100){
			progress = 0;
			clearInterval(timer);
		}
	},100);


	//put
	res.json('ok');
})


//get
// var timer = setInterval(function(){
// 		progress += 10;
// 		io.sockets.emit('progress', progress);
// 		if (progress == 100){
// 			progress = 0;
// 			clearInterval(timer);
// 		}
// 	},1000);

io.sockets.on('connection', function (socket) {
	var me = null;
	socket.on('login', function(data){
		me = {
			id : guid(),
			company_id : '2222',
      		name : 'test',
      		address: Faker.Address.streetAddress(),
      		pos: {lat: 53.89116 + Math.random()/100, lon: 27.551 + Math.random()/100}
		};
		online.push(me);
		io.sockets.emit('in', me);
	});

	socket.on('logout', function(){
		if (me!=null) {
			removeById(online, me.id);
			io.sockets.emit('out', me.id);
			me = null;
		}
	})

	socket.on('disconnect', function () {
		if (me!=null) {
			removeById(online, me.id);
			io.sockets.emit('out', me.id);
			me = null;
		}
 	});
});