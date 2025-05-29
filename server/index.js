const express = require('express')
const cors = require('cors');
const userRouters = require('./users');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/api/users', userRouters);

app.listen(PORT, ()=>{
    console.log("Server running on: http://localhost:${PORT}")
});
