const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Array to store received requests
let requests = [];

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

// POST route
app.post('/register', (req, res) => {
    // Log received data along with timestamp and IP address
    const requestData = {
        data: req.body,
        timestamp: new Date(),
    };
    requests.push(requestData);

    // Send response back to the user
    res.json({ message: 'Data received successfully' });
});

app.post('/register-tshirt', (req, res) => {
    // Log received data along with timestamp and IP address
    if (!req.body.words) {
        return res.json({ message: 'Text for the t-shirt not received. Check "name" field in your form control' });
    }

    if (!req.body.size) {
        return res.json({ message: 'Size for the t-shirt not received. Check "name" field in your form control' });
    }

    if (!req.body.color) {
        return res.json({ message: 'Color for the t-shirt not received. Check "name" field in your form control' });
    }

    // Send response back to the user
    res.json({ message: 'New T-Shirt', data: req.body });
});

// GET route to display requests in HTML table format
app.get('/', (req, res) => {
    let html = '<table border="1"><tr><th>Data</th><th>Timestamp</th></tr>';
    requests.forEach(request => {
        html += `<tr><td>${JSON.stringify(request.data)}</td><td>${request.timestamp}</td></tr>`;
    });
    html += '</table>';
    res.send(html);
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
