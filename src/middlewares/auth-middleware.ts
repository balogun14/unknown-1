import { NextFunction, Request, Response } from 'express';
import { auth } from '../utils/auth';
import { fromNodeHeaders } from 'better-auth/node';
import logger from '../utils/logger';
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session) {
      req.user = session?.user;
      next();
      return;
    }
    res
      .status(401)
      .json({ sucess: 'false', message: 'Unauthorized. Please sign in.' });
  } catch (error: any) {
    logger.error('Error in authenticateToken middleware:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}
