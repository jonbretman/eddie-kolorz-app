var Hapi = require('hapi');
var server = new Hapi.Server('localhost', 3000);
var io = require('socket.io').listen(server.listener);

// serve the static files
server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
        directory: {
            path: 'static'
        }
    }
});

// listen for the dataz
server.route({
    method: 'POST',
    path: '/',
    handler: function (request, reply) {

        var data;

        try {
            // no idea what is going on here....
            data = JSON.parse(Object.keys(request.payload)[0]);
        }
        catch (e) {
            console.log('Bad request:', request.payload);
            reply(Hapi.error.badRequest());
            return;
        }

        // send back 200 ok
        reply();

        // push data to client
        io.emit('data', data);
    }
});

// lets go!
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
