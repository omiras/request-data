const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");


const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// POST route
app.post('/register', (req, res) => {
    // Log received data
    console.log('Received data:', req.body);

    // Send response back to the user
    res.json({
        message: 'Datos de inscripción recibidos:',
        data: req.body
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});