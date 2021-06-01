export const logoutUser = (req, res) => {
  res.clearCookie('token');
  return res.sendStatus(200);
};
