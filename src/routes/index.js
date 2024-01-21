const express = require('express');
const v1Routes = require('./v1');
const HttpResponse = require('../core/response/httpResponse');
const { env } = require('../config/env');

const route = express.Router();

route.get('/', function index(req, res) {
    let responseData = {
        message: 'CricBuzz Live API',
        maintaner: 'ekamid, <ebrahimkha71@gmail.com>',
        source: 'https://github.com/ekamid/cricbuzz-live',
        docs: `${env.APP_BASE_URL}/v1/api-docs`,
    };

    const httpResponse = HttpResponse.get(responseData);
    res.status(200).json(httpResponse);
});

route.get('/health', function serverHealth(req, res) {
    const startUsage = process.cpuUsage();

    const status = {
        uptime: process.uptime(),
        message: 'Ok',
        timezone: 'ID',
        date: new Date().toISOString(),
        node: process.version,
        memory: process.memoryUsage(),
        platform: process.platform,
        cpu_usage: process.cpuUsage(startUsage),
    };

    const httpResponse = HttpResponse.get({
        message: 'Server Uptime',
        data: status,
    });
    res.status(200).json(httpResponse);
});

route.get('/v1', function (req, res) {
    const method = req.method;
    const url = req.originalUrl;
    const host = req.hostname;

    const endpoint = `${host}${url}`;

    res.status(403).json({
        error: {
            message: `Forbidden, wrong access method ${method} endpoint: ${endpoint}`,
        },
    });
});

route.use('/v1', v1Routes);

module.exports = route;
