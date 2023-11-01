import express from 'express';

import config from '../config/express.json' assert {type: 'json'};
import { router } from './routes.js';

const app = express();

app.set('jsonp callback name', 'cb');

app.use(express.json());

app.use(express.static('public'));

app.use('/', router);

app.use((err, _req, res, _next) => {

  console.error(err.stack);

  res.status(500).send('Something broke!');

});

app.listen(config.port, () => console.log(`Server started on ${config.host}:${config.port}`));
