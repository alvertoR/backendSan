import userController from '../controllers/user';
import express        from 'express';

var router = express.Router();

router.post('/register', userController.addUser);
router.post('/login', userController.loginUser);

export default router;