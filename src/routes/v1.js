const express = require('express');
const path = require('path');
const { getRoutes } = require('../core/modules/getRoutes');

const route = express.Router();

const baseRoutes = path.resolve(`${__dirname}/../controllers`);

module.exports = route;

// Mapping Route
getRoutes(baseRoutes);
