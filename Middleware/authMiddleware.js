const jwt = require('jsonwebtoken');
const secretKey = 'yourSecretKey';

exports.verifyToken = (req, res, next) => {
const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized - Token not provided' });
  }

  try {

    const decoded = jwt.verify(token, secretKey);
    
    req.user = decoded;
    
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthorized - Invalid token' });
  }
};
