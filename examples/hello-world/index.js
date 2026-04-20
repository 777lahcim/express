'use strict'

const os = require('os');
var express = require('../../');

var app = module.exports = express()

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
