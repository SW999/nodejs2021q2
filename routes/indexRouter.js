import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'Auto Suggest Users List', header: 'Get user list' });
});

export default router;
