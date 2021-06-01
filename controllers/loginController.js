import { NotFound, login } from '../utils';
import { HTTP_STATUS_CODE } from '../constants';

export const loginUser = (req, res) => {
  const { username, password } = req.body;
  const token = login(username, password);

  if (!token) {
    NotFound('Username or password incorrect');
  }

  res.cookie('token', token, { httpOnly: true });
  res.status(HTTP_STATUS_CODE.OK).json(token);
};
