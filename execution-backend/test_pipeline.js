const fetch = require('node-fetch'); // Needs node-fetch installed or use built-in fetch in Node 18+

// If standard fetch is available (Node 18+), we don't need require.
// But to be safe in commonjs environment without type module, we might need a workaround or just use http.
// I'll use native http module to avoid installing extra dependencies for the test script.
const http = require('http');

const data = JSON.stringify({
    nodes: [
        { id: "1", type: "log", data: { message: "Starting Pipeline..." } },
        { id: "2", type: "delay", data: { time: 500 } }, // Short delay for test
        { id: "3", type: "math", data: { operation: "add", a: 10, b: 20 } },
        { id: "4", type: "delay", data: { time: 500 } },
        { id: "5", type: "log", data: { message: "Pipeline Finished!" } }
    ],
    edges: [
        { source: "1", target: "2" },
        { source: "2", target: "3" },
        { source: "3", target: "4" },
        { source: "4", target: "5" }
    ]
});

const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/execute',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length
    }
};

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);

    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });

    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(data);
req.end();
