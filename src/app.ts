import 'reflect-metadata';
import express from "express";
import createConnection from './database';

createConnection();
const app = express();

require('./routes/users.routes')(app)

export { app }
