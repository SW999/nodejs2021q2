export const mainController = (req, res) => {
  if (req?.cookies.token) {
    res.render('index', { title: 'NodeJS course', header: 'CRUD operations' });
  } else {
    res.render('login', { title: 'Login', header: 'Login' });
  }
};
