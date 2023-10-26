import { Router } from 'express';

const router = Router();

router.use((req, _, next) => {

  console.log(`Request handled for ${req.url} at ${Date.now()}`);

  next();

});

router.post('/requestOtp', (req, res) => {

  console.log(`${req.url} - ${req.body}`);

  res.sendStatus(200);

});

router.get('/requestData', (req, res) => {

  console.log(`${req.url} - ${req.body}`);

  res.status(200).jsonp({

    name: 'Gaurav'

  });

});

router.use((req, res, next) => {

  console.error(`Invalid path ${req.url} at ${Date.now()}`);

  res.sendStatus(400);

});

export { router };
