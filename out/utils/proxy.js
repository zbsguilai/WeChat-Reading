"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startProxy = void 0;
const http = require('http');
const { createProxyMiddleware } = require('http-proxy-middleware');
const connect = require('connect');
const app = connect();
const options = {
    target: 'https://weread.qq.com',
    changeOrigin: true,
    secure: false,
    // 解决跨站问题
    cookiePathRewrite: {
        '/': '/;secure;SameSite=None',
    },
    cookieDomainRewrite: {
        '*': 'localhost',
    },
    onProxyRes(proxyRes) {
        // 解决跨域问题
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    },
};
const proxyMiddleware = createProxyMiddleware(options);
app.use('/', proxyMiddleware);
const startProxy = (port) => {
    return http.createServer(app).listen(port, () => {
        console.log(`wxreader proxy server start @${port}`);
    });
};
exports.startProxy = startProxy;
//# sourceMappingURL=proxy.js.map