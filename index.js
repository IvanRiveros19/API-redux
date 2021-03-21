const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const server = express();

const PORT = 3010;

server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.use('/api/auth', require('./src/routes/auth'));
server.use('/api/laptops', require('./src/routes/laptops'));

server.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`);
});

