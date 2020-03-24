import { createConnection, Connection } from 'typeorm';

// export async function connections(): Promise<Connection> {
//     const connection: Connection = await createConnection({
//         type: 'mongodb',
//         host: 'localhost',
//         port: 27017,
//         database: 'users_db',
//         entities: ['../components/User/model.ts'],
//     });

//     return connection;
// }

export function connection(): Promise<Connection> {
    return createConnection({
        type: 'mongodb',
        host: 'localhost',
        port: 27017,
        database: 'users_db',
        entities: ['../components/User/model.ts'],
    });
}

// const connection: Connection = createConnection({
//     type: 'mongodb',
//     host: 'localhost',
//     port: 27017,
//     database: 'users_db',
//     entities: ['../components/User/model.ts'],
// });
