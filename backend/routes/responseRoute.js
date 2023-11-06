import * as authMiddleware from '../middlewares/authMiddleware.js';
import * as responseController from '../controllers/responseController.js';

import express from 'express';
const router = express.Router();

router.route('/create').post(responseController.createResponse);
router.route('/').get(responseController.getResponses);
router.route('/:id').get(responseController.getResponsesBySurveyId);
router.route('/update/:id').put(responseController.updateResponseByIP);
router.route('/delete/:id').delete(responseController.deleteResponseByIP);

export default router;
