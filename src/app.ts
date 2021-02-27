import 'reflect-metadata';

import express from "express";
import session from 'express-session';

import createConnection from './database';

createConnection();

const app = express();

app.use(session({secret: process.env.SESSION_SECRET, saveUninitialized: true, resave: false}));
app.use(express.json());

require('./routes/users.routes')(app)
require('./routes/bills.routes')(app)

export { app }
