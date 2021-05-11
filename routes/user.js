import { Router } from 'express';
import { validateSchema, userSchemaEdit, userSchema } from '../validation';
import controllers from '../controllers';

const router = Router();

router.route('/')
  .get(controllers.getAllUsers)
  .post(validateSchema(userSchema), controllers.createUser);

router.route('/:id')
  .get(controllers.getUserById)
  .put(validateSchema(userSchemaEdit), controllers.editUser)
  .delete(controllers.deleteUser);

router.post('/selected', controllers.getLimitedUsersByLoginSubstring);

export default router;
