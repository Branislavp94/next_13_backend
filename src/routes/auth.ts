import { Router } from 'express';
import { registerUserProviders, registration } from '../controllers/auth';

const auth = Router();

auth.post('/register/providers', async (req, res) => {
  const response = await registerUserProviders(req);

  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

auth.post('/register', async (req, res) => {
  const response = await registration(req);

  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

export default auth;
