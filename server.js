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

        var colorsAggregate = request.payload.colors_aggregate;
        var colorsInstance = request.payload.colors_instance;

        console.log('payload', request.payload);

        // send back 200 ok
        reply();

        if (Array.isArray(colorsAggregate)) {
            console.log('Received aggregate colors', colorsAggregate);
            io.emit('colors-aggregate', colorsAggregate);
        }

        if (Array.isArray(colorsInstance)) {
            console.log('Received instance colors', colorsInstance);
            io.emit('colors-instance', colorsInstance);
        }
    }
});

// lets go!
server.start(function () {
    console.log('Server running at:', server.info.uri);
});
