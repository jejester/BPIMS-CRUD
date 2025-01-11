const express = require('express');
const app = express();
const db = require('./models');
const path = require('path');
const cors = require('cors');

// allows to receive json data
app.use(express.json());

// allows to receive data from another domain
app.use(cors());

// routes 
app.get('/api', (req, res) => {
    res.send('Welcome to the Employee API');
});
const employeesRouter = require('./routes/Employees');
app.use('/api/employees', employeesRouter);

// serve static files
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

const PORT = process.env.PORT || 5000;

// sync the database and start the server
db.sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((err) => {
    console.error('Error starting server: ', err);
});