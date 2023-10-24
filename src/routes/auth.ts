import { Router } from 'express';
import { registration } from '../controllers/auth';

const auth = Router();

auth.post('/register', async (req, res) => {
  const response = await registration(req);

  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

export default auth;
