import express from 'express';
import authController from "../controllers/AuthController";
import UserController from '../controllers/UserController';
import verifyAccessToken from "../middlewares/verifyAccessToken";

const router = express.Router();
const { handleLogin,handleRegister, logout, autoSignInUser } = authController;

router.post('/login', handleLogin);
router.post('/register', handleRegister);
router.get("/verifyAccessToken", verifyAccessToken, autoSignInUser);
// router.use(verifyAccessToken);
router.post('/logout', logout);
router.post('/resetPassword', UserController.resetPassword)

export default router;