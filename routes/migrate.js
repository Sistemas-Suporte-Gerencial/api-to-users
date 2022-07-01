import {Router} from 'express';
import validToken from '../middleware/validToken.js';
import pg from 'pg';

const router = Router();

router.use(validToken);

router.post('/migrate', (req, res) => {
    let {text, databases, excludes} = req.body;

    let count = 0;
    const successfull = [];
    const errors = [];
    
    const sql = text;
    
    if(databases === undefined) {
        databases = ['sgedu_homologacao', 'sgedu_ferreiros', 'sgedu_pedras_de_fogo', 'sgedu_cupira', 'sgedu_belo_jardim', 'sgedu_calumbi'];
    }

    if(excludes !== undefined) {
        databases = databases.filter(database => !excludes.includes(database));
    }

    databases.map(async database => {
        const pool = new pg.Pool({
            user: process.env.USER_DB,
            host: process.env.HOST_DB,
            database: database,
            password: process.env.PASSWORD_DB,
            port: 5432,
        });

        try {
            await pool.query(sql);
            successfull.push({database, success: true});
            count++;
        } catch (error) {
            errors.push({database, error});
            count++;
        }

        if(count === databases.length) {
            await pool.end();

            return res.status(200).json({
                successfull,
                errors,
            });
        }

    });
});

export default router;