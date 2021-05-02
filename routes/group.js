import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.getAllGroups);

router.route('/:id')
    .get(controllers.getGroupById)
    .put(controllers.editGroup)
    .delete(controllers.deleteGroup);

router.post('/', controllers.createGroup);
router.post('/:userId/:groupId', controllers.addUserGroup);

export default router;
