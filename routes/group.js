import { Router } from 'express';
// import { validateSchema, userSchemaEdit, userSchema } from '../validation';
import controllers from '../controllers';

const router = Router();

router.get('/', controllers.getAllGroups);

router.route('/:id')
    .get(controllers.getGroupById)
    .put(controllers.editGroup)
    .delete(controllers.deleteGroup);

router.post('/', controllers.createGroup); // TODO: Add validation
// validateSchema(userSchema)

export default router;
