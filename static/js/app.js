var socket = io('http://localhost');

socket.on('data', function (data) {
    console.log(data);
});
