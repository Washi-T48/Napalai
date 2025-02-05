import dotenv from 'dotenv';
import pkg from 'pg';
const { Pool } = pkg;

dotenv.config();

const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    connectionTimeoutMillis: process.env.DB_CONNECTION_TIMEOUT
});

export const testConnection = async () => {
    try {
        const client = await pool.connect();
        console.log('Connected to database');
        client.release();
    } catch (err) {
        console.log('Error connecting to database', err);
    }
};

export default pool;