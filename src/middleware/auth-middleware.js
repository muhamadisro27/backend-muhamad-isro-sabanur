import jwt from 'jsonwebtoken';
import {
  logger
} from '../app/logger.js';

export const authMiddleware = async (req, res, next) => {
  const token = req.get("Authorization");

  if (!token) {
    res.status(401).json({
      errors: "Unauthorized"
    }).end()
  }

  try {
    const verified = jwt.verify(token, 'SECRET_KEY');
    logger.info(verified)
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};