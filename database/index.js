import pg from 'pg';

export const initDb = () => {
    const pool = new pg.Pool({
        user: process.env.USER_DB,
        host: process.env.HOST_DB,
        database: process.env.DATABASE,
        password: process.env.PASSWORD_DB,
        port: 5432,
    });

    return pool;
}