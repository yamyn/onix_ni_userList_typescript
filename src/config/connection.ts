import { createConnection, Connection } from 'typeorm';

export async function connections(): Promise<Connection> {
    const connection: Connection = await createConnection({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'users_db',
        entities: ['../components/User/model.ts'],
    });

    return connection;
}
