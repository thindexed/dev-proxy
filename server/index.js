const express = require('express');
const morgan = require("morgan");
const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Configuration
const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "https://app.thindexed.personal.shoot.canary.k8s-hana.ondemand.com";

// Logging
app.use(morgan('dev'));

// Info GET endpoint
app.get('/info', (req, res, next) => {
    res.send('This is a proxy service which proxies to JSONPlaceholder API.');
});

// Proxy endpoints
app.use('/common', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
     //   [`^/common`]: '',
    },
}));

// Proxy endpoints
app.use('/shapes', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
     //   [`^/common`]: '',
    },
}));

// Proxy endpoints
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
     //   [`^/common`]: '',
    },
}));
// Proxy endpoints
app.use('/socket.io', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
     //   [`^/common`]: '',
    },
}));
// Proxy endpoints
app.use('/permissions', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
     //   [`^/common`]: '',
    },
}));

app.use('/circuit', express.static('/Users/d023280/Documents/workspace/thindexed/thindexed-circuit/src/web'));

// Start Proxy
app.listen(PORT, HOST, () => {
    console.log(`Starting Proxy at ${HOST}:${PORT}`);
});
