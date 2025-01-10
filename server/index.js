const express = require('express');
const app = express();
const cors = require('cors');

// allows to receive json data
app.use(express.json());

// allows to receive data from another domain
app.use(cors());

// routes 
app.use('/test', (req, res) => {
    res.send('Hello World');
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});