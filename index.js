/*!
 * express
 * Copyright(c) 2009-2013 TJ Holowaychuk
 * Copyright(c) 2013 Roman Shtylman
 * Copyright(c) 2014-2015 Douglas Christopher Wilson
 * MIT Licensed
 */

'use strict';

var app = module.exports = require('./lib/express');
const os = require('os');

app.get('/', function(req, res){
  res.send('Hello World');
});

app.get('/advanced', (req, res) => {
    const healthCheck = {
        status: "pass",
        timestamp: new Date().toISOString(),
        uptimeSeconds: process.uptime(),
        serviceDetails: {
            name: "express-pipeline-dind",
            version: process.env.APP_VERSION || "unknown", 
            nodeEnv: process.env.NODE_ENV || "development"
        },
        metrics: {
            memoryRssBytes: process.memoryUsage().rss, 
            loadAverage: os.loadavg()[0]
        },
        checks: {
            database: "connected",
            cache: "operational"
        }
    };

    res.status(200).json(healthCheck);
});

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
