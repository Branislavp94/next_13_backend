import { Router } from 'express';
import { getAuthUser } from '../controllers/userContoller';

const user = Router();

user.get('/auth', async (req, res) => {
  const response = await getAuthUser(req);

  if (response.success) {
    res.status(200).json(response);
  } else {
    res.status(400).json(response);
  }
});

export default user;
