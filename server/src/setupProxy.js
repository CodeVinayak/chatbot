module.exports = function (app) {
    app.use(
        '​/api',
        createProxyMiddleware({
            target: 'https://www.chatbot.vinayaksingh.com',
            changeOrigin: true,
        })
    );
};