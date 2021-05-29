import { Router } from 'express';
import controllers from '../controllers';

const router = Router();

router.route('/')
  .post(controllers.loginUser);

export default router;
