import { Router } from 'express';
import { validateSchema, userSchemaEdit, userSchema } from '../validation';
import controllers from '../controllers';
import { authenticateJWT } from '../middleware';

const router = Router();

router.route('/')
  .get(authenticateJWT, controllers.getAllUsers)
  .post(authenticateJWT, validateSchema(userSchema), controllers.createUser);

router.route('/:id')
  .get(authenticateJWT, controllers.getUserById)
  .put(authenticateJWT, validateSchema(userSchemaEdit), controllers.editUser)
  .delete(authenticateJWT, controllers.deleteUser);

router.post('/selected', authenticateJWT,  controllers.getLimitedUsersByLoginSubstring);

export default router;
