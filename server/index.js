const express = require('express');
const app = express();
const db = require('./models');
const cors = require('cors');

// allows to receive json data
app.use(express.json());

// allows to receive data from another domain
app.use(cors());

// routes 
const employeesRouter = require('./routes/Employees');
app.use('/employees', employeesRouter);


// sync the database and start the server
db.sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch((err) => {
    console.error('Error starting server: ', err);
});