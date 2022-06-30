'use strict';
import 'dotenv/config';
import express  from 'express';
import bodyParser from 'body-parser';

import {encrypt, decrypt} from './helpers/index.js';
import {initDb} from './database/index.js';

const app = express();
const pool = initDb();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/decrypt', (req, res) => {
    return res.status(200).json({
        decrypted: decrypt(req.body.text)
    });
});

app.post('/encrypt', (req, res) => {
    return res.status(200).json({
        encrypted: encrypt(req.body.text)
    });
});

const validToken = (req, res, next) => {
    if(req.headers.authorization === process.env.TOKEN) {
        next();
    } else {
        return res.status(401).json({
            error: 'Unauthorized'
        });
    }
}

app.post('/users', validToken, async (req, res) => {
    const {name, email, password} = req.body;
      
    try {
        const sql = `SELECT u.id_usuario, u.nome_usuario, u.email_usuario, u.senha_nova FROM usuarios u WHERE 1=1 ${email !== undefined ? `AND u.email_usuario ILIKE '%${email}%'` : ''} ${name !== undefined ? `AND u.nome_usuario ILIKE '%${name}%'` : '' } ${password !== undefined ? `AND u.senha_nova = '${encrypt(password)}'` : ''}`;

        const resp = await pool.query(sql);

        const rows = resp.rows;

        rows.map(user => {
            user.senha_nova = decrypt(user.senha_nova);
            user.senha_usuario = undefined;
        });

        return res.status(200).json({
            data: rows
        });
    } catch (error) {
        return res.status(500).json({
            error: error
        });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});