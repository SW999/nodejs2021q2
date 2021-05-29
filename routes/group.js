import { Router } from 'express';
import controllers from '../controllers';
import { validateSchema, groupSchema, groupSchemaEdit } from '../validation';
import { authenticateJWT } from '../middleware';

const router = Router();

router.route('/')
  .get(authenticateJWT, controllers.getAllGroups)
  .post(authenticateJWT, validateSchema(groupSchema), controllers.createGroup);

router.route('/:id')
  .get(authenticateJWT, controllers.getGroupById)
  .put(authenticateJWT, validateSchema(groupSchemaEdit), controllers.editGroup)
  .delete(authenticateJWT, controllers.deleteGroup);

router.post('/user_groups', authenticateJWT, controllers.addUserGroup);

export default router;
