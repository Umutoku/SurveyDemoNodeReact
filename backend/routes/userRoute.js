import express from 'express';
import * as userController from '../controllers/userController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();
//authMiddleware.authenticateToken sayesinde token kontrolü yapıyoruz
router.route('/register').post(userController.createUser);
router.route('/login').post(userController.loginUser);
router.route('/logout').get(authMiddleware.authenticateToken, userController.logoutUser);
router.route('/:id').delete(authMiddleware.authenticateToken, userController.deleteUser);
router
  .route('/')
  .get(userController.getAllUsers);

export default router;
