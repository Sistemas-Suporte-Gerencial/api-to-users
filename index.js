'use strict';
import 'dotenv/config';
import express  from 'express';
import bodyParser from 'body-parser';

import userRoute from './routes/users.js';
import migrateRoute from './routes/migrate.js';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', userRoute);
app.use('/', migrateRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
});