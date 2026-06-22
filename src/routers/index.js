import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.status(200).json({
    message: 'API is live',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

//here

export default router;
