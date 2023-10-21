const express = require("express");
const app = express();
require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const yaml = require('yaml');
const router = require('./route/routers');

app.use(express.json({ strict: false }));
app.use("/api/v1", router);

module.exports = app;