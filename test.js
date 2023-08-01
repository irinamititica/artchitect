import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const { BALANCER_HOST, BALANCER_PORT } = process.env;

const server = () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.get('/', (req, res) => {
    console.log('[ balancer (JS) ⚖️ ] Called API: /');

    res.send({
      message: 'Hello Architect!',
      appId: 'javascript-balancer'
    });
  });
