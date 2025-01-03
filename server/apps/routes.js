import express from 'express';
import controller from './controller.js';
const router = express.Router();

router.get(
  '/',
  controller.getIndex
);

router.get(
  '/user-list',
  controller.getUserList
);

router.get(
  '/admin-profile',
  controller.getAdminProfile
);

// error handler
router.use("*", controller.getNotFound);

router.use(controller.getServerError);

export default router;