export const mainController = (req, res) => {
    res.render('index', { title: 'Auto Suggest Users List', header: 'Get user list' });
};
