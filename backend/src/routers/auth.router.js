import { Router } from "express";
import {changePassword, logIn, logOut, signUp} from '../controllers/auth.controller.js'
import isAuth from "../middleware/isAuth.js";

const authRouter = Router()

authRouter.post('/signup', signUp)
authRouter.post('/login', logIn)
authRouter.get('/logout', logOut)
authRouter.patch('/change-password', isAuth, changePassword)


export default authRouter;