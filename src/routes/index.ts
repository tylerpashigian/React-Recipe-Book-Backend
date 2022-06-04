import express from 'express';
const router = express.Router();

router.get('/heartbeat', function (req, res, next) {
  res.send('Server is up and running');
});

export default router;
