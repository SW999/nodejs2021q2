import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.getLimitedUsersByLoginSubstring);

router.route('/:id')
    .get(controllers.getUserById)
    .put(controllers.editUser)
    .delete(controllers.deleteUser);

router.post('/', controllers.createUser);

export default router;
