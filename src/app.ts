import express from "express";

const app = express();

require('./routes/users.routes')(app)

export { app }
