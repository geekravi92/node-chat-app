const path = require('path');
const express = require('express');
const { PORT } = require('../config/config');

const app = express();
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

app.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});
