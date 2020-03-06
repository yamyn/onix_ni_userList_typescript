import * as http from 'http';
import * as events from './events';
import server from './server';
// import port = server.get('port');

// events.bind(http.createServer(server).listen(port), port);

const Server: http.Server = http.createServer(server);

/**
 * Binds and listens for connections on the specified host
 */
Server.listen(server.get('port'));

/**
 * Server Events
 */

Server.on('error', (error: Error): void =>
    events.onError(error, server.get('port')),
);

Server.on('listening', events.onListening.bind(Server));
