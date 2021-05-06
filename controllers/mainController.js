export const mainController = (req, res) => {
  res.render('index', { title: 'Test page', header: 'CRUD operations' });
};
