import {Router} from 'express';
import {initDb} from '../database/index.js';
import {encrypt, decrypt} from '../helpers/index.js';
import validToken from '../middleware/validToken.js';

const router = Router();
const pool = initDb();

router.use(validToken);

router.post('/users', async (req, res) => {
    const {name, email, password} = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            error: 'Missing fields'
        });
    }
      
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
            error
        });
    }
});

router.post('/decrypt', (req, res) => {
    return res.status(200).json({
        decrypted: decrypt(req.body.text)
    });
});

router.post('/encrypt', (req, res) => {
    return res.status(200).json({
        encrypted: encrypt(req.body.text)
    });
});

export default router;