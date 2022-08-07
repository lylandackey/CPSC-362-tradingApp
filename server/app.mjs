import express from 'express';
import cors from "cors";

import router from './routes/routes.mjs';

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(cors());

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(router);

app.listen(5000);