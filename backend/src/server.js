import cors from 'cors'
import express from 'express'
import { Roteamento } from './routes.js';
const server = express();

server.use(express.json());

server.use(cors());

Roteamento(server);


server.listen(5010, () => {
    console.log(`Servidor subiu!`)
})