const app = require('../src/app');
const connectDB = require('../src/config/db');
const { configuration } = require('../src/config/env');
const { randomUUID } = require('node:crypto');
module.exports = async (req, res) => {
    try {
        configuration();
        await connectDB();
        return app(req, res);
    } catch {
        const requestId = randomUUID();
        res.setHeader('X-Request-ID', requestId);
        return res.status(503).json({ error: { code: 'NOT_READY', message: 'The service is unavailable.' }, requestId });
    }
};
