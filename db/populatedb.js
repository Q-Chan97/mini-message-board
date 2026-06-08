// One-time database population

import { Client } from "pg";

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR ( 255 ),
    added TIMESTAMP,
    message TEXT
);


INSERT INTO messages (username, added, message)
VALUES
    ('Piglet', NOW(), 'Hello from the database!'),
    ('Eeyore', NOW(), 'Hello, from the zeroes and ones...');
`

async function main() {
    console.log("seeding...");
    const client = new Client({
        connectionString: process.env.DB_CONNECTION_URL
    });
    await client.connect();
    try {
        await client.query(SQL);
        console.log("connected to ", process.env.DB_CONNECTION_URL);
    } catch (err) {
        console.error("Error running SQL: ", err);
    } finally {
        await client.end();
        console.log("done");
    }
}

main();