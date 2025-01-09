import express from 'express';
import controller from './controller.js';
const router = express.Router();

router.get(
  '/',
  controller.getIndex
);

router.get(
  '/login',
  controller.getLogin
);

router.get(
  '/user-list',
  controller.getUserList
);

router.get(
  '/admin-profile',
  controller.getAdminProfile
);

router.get(
  '/profile',
  controller.getProfile
);

router.get(
  '*',
  controller.getNotFound
);

router.use(
  controller.getServerError
);


export default router;