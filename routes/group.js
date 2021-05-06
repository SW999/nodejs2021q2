import { Router } from 'express';
import controllers from '../controllers';
import { validateSchema, groupSchema, groupSchemaEdit } from '../validation';

const router = Router();

router.get('/', controllers.getAllGroups);

router.route('/:id')
  .get(controllers.getGroupById)
  .put(validateSchema(groupSchemaEdit), controllers.editGroup)
  .delete(controllers.deleteGroup);

router.post('/', validateSchema(groupSchema), controllers.createGroup);
router.post('/user_groups', controllers.addUserGroup);

export default router;
