import 'reflect-metadata';
import express, { json } from "express";
import createConnection from './database';

createConnection();

const app = express();
app.use(express.json());

require('./routes/users.routes')(app)

export { app }
