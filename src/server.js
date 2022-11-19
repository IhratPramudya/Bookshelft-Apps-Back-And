/* eslint-disable indent */
const hapiServer = require('@hapi/hapi');
const routs = require('./routs-server');

const init = async () => {
    const server = hapiServer.server({
        host: 'localhost',
        port: 5000,
    });

    server.route(routs);
   await server.start();

   console.log(`port berjalan dengan menerapkan localhost ${server.info.uri}`);
};

init();
