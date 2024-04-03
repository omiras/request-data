const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Array to store received requests
let requests = [];

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST route
app.post('/data', (req, res) => {
    // Log received data along with timestamp and IP address
    const requestData = {
        data: req.body,
        timestamp: new Date(),
        ip: req.ip
    };
    requests.push(requestData);

    // Send response back to the user
    res.json({ message: 'Data received successfully' });
});

// GET route to display requests in HTML table format
app.get('/', (req, res) => {
    let html = '<table border="1"><tr><th>Data</th><th>Timestamp</th><th>IP Address</th></tr>';
    requests.forEach(request => {
        html += `<tr><td>${JSON.stringify(request.data)}</td><td>${request.timestamp}</td><td>${request.ip}</td></tr>`;
    });
    html += '</table>';
    res.send(html);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
