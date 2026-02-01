const http = require('http');

http.get('http://localhost:3000/v1/status/tw-edge2.vproxy.cloud:20004', (res) => {
    let data = '';
    res.on('data', (chunk) => {
        data += chunk;
    });
    res.on('end', () => {
        console.log(data);
    });
}).on('error', (err) => {
    console.error('Error: ' + err.message);
});
