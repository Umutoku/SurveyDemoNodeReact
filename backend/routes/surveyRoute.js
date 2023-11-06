import express from 'express';
import * as surveyController from '../controllers/surveyController.js';
import * as authMiddleware from '../middlewares/authMiddleware.js';
import { checkUser } from '../middlewares/authMiddleware.js';
import verifyJWT from '../middlewares/verifyJWT.js';
const router = express.Router();

router.route('/create').post(surveyController.createSurvey);
router.route('/update/:id').put(authMiddleware.authenticateToken, checkUser,surveyController.updateSurvey);
router.route('/delete/:id').delete(authMiddleware.authenticateToken,surveyController.deleteSurvey);
router.route('/').get(surveyController.getAllSurveys);
router.route('/:id').get(surveyController.getSurveyById);

export default router;
