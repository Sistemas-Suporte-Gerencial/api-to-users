'use strict';
import 'dotenv/config';
import express  from 'express';
import validToken from './middleware/validToken.js';

import userRoute from './routes/users.js';
import migrateRoute from './routes/migrate.js';
import emailRoute from './routes/email.js';
import administratorRoute from './routes/administrator.js';

const app = express();

app.use(express.json());

app.use(validToken);

app.use('/', userRoute);
app.use('/migrate', migrateRoute);
app.use('/email', emailRoute);
app.use('/api/administrator', administratorRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});