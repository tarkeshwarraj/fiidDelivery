import express from 'express';
import { isAuth, login, register,logout } from '../controllers/UserController.js';
import authUser from '../middlewares/authUser.js';

const userRouter = express.Router();

userRouter.post('/register', register);
userRouter.post('/login', login);
userRouter.get('/is-auth',authUser, isAuth);
userRouter.post('/logout',authUser, logout);


export default userRouter;