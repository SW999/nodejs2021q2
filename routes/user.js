import { Router } from 'express';
import { validateSchema, userSchemaEdit, userSchema } from '../validation';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.getLimitedUsersByLoginSubstring);

router.route('/:id')
  .get(controllers.getUserById)
  .put(validateSchema(userSchemaEdit), controllers.editUser)
  .delete(controllers.deleteUser);

router.post('/', validateSchema(userSchema), controllers.createUser);

export default router;
