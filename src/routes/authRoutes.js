import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
  requestResetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  requestResetEmail,
  resetPassword,
} from '../controllers/authController.js';

const authRoutes = Router();

authRoutes.post('/auth/register', celebrate(registerUserSchema), registerUser);
authRoutes.post('/auth/login', celebrate(loginUserSchema), loginUser);
authRoutes.post('/auth/logout', logoutUser);
authRoutes.post('/auth/refresh', refreshUserSession);
authRoutes.post(
  '/auth/request-reset-email',
  celebrate(requestResetEmailSchema),
  requestResetEmail,
);
authRoutes.post(
  '/auth/reset-password',
  celebrate(resetPasswordSchema),
  resetPassword,
);

export default authRoutes;
