export const mainController = (req, res) => {
  res.render('index', { title: 'NodeJS course', header: 'CRUD operations' });
};
