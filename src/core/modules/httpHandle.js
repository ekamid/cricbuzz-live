const { blue, cyan, green } = require('colorette');
const { env } = require('../../config/env');

function httpHandle(server, port) {
    /**
     * Handle HTTP Error
     * @param port
     * @param error
     */
    const onError = (error) => {
        if (error.syscall !== 'listen') {
            throw new Error();
        }

        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`);
                process.exit(1);
                break;
            default:
                throw new Error();
        }
    };

    /**
     * On Listening HTTP
     * @param server
     */
    const onListening = () => {
        const addr = server.address();
        const bind = typeof addr === 'string' ? `${addr}` : `${addr?.port}`;

        const host = cyan(`http://localhost:${bind}`);
        const nodeEnv = blue(env.NODE_ENV);

        const msgType = green(`${env.APP_NAME}`);
        const message = `server listening on ${host} ⚡️ & env: ${nodeEnv} 🚀`;
    };

    return { onError, onListening };
}

module.exports = { httpHandle };
