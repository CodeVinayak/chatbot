module.exports = function (app) {
    app.use(
        '​/api',
        createProxyMiddleware({
            target: 'https://chatbot.vinayaksingh.com',
            changeOrigin: true,
        })
    );
};