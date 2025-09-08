import { Router } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from '../../../utils/auth';
const router: Router = Router();

/**
 * @swagger
 * /api/auth/sign-in/email:
 *   post:
 *     summary: Sign in with email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Sign-in email sent or sign-in successful
 *       400:
 *         description: Invalid email or request
 */
router.post('/sign-in/email', toNodeHandler(auth));

/**
 * @swagger
 * /api/auth/sign-up/email:
 *   post:
 *     summary: Sign up with email, password, and name
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: strongPassword123
 *               name:
 *                 type: string
 *                 example: John Doe
 *     responses:
 *       201:
 *         description: User created and signed in
 *       400:
 *         description: Invalid input or user already exists
 */
router.post('/sign-up/email', toNodeHandler(auth));

/**
 * @swagger
 * /api/auth/sign-out:
 *   post:
 *     summary: Sign out the current user
 *     tags:
 *       - Auth
 *     responses:
 *       200:
 *         description: Successfully signed out
 *       401:
 *         description: User not authenticated
 */
router.post('/sign-out', toNodeHandler(auth));

router.all('/{*any}', toNodeHandler(auth));
export default router;
