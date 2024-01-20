const http = require('http');
const { App } = require('./config/app');
const { env } = require('./config/env');
const { httpHandle } = require('./core/modules/httpHandle');

function bootstrap() {
    const port = env.APP_PORT;

    // create express app
    const app = new App().create();

    const server = http.createServer(app);

    // http handle
    const { onError, onListening } = httpHandle(server, port);

    // run server listen
    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);
}

bootstrap();
