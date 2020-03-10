import { Address } from 'cluster';

/**
 * @function
 * @param  {NodeJS.ErrnoException} error
 * @param  {number|string|boolean} port
 * @returns throw error
 */
export function onError(
    error: NodeJS.ErrnoException,
    port: number | string | boolean,
): void {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bindPort: string =
        typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    switch (error.code) {
        case 'EACCES':
            // tslint:disable-next-line: no-console
            console.error(`${bindPort} requires elevated privileges`);
            process.exit(1);

            break;
        case 'EADDRINUSE':
            // tslint:disable-next-line: no-console
            console.error(`${bindPort} is already in use`);
            process.exit(1);

            break;
        default:
            throw error;
    }
}
/**
 * @function
 * @inner
 * @description log port to console
 */
export function onListening(): void {
    const addr: Address = this.address();
    const bindPort: string =
        typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;

    // tslint:disable-next-line: no-console
    console.log(`Listening on ${bindPort}`);
}
