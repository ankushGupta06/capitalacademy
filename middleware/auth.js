const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = function authenticateToken(allowedRoles = []) {
  return (req, res, next) => {

    let token;

    // 1️⃣ Try: Authorization header (Bearer token)
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const parts = authHeader.split(' ');
      if (parts.length === 2 && parts[0] === 'Bearer') {
        token = parts[1];
      }
    }

    // 2️⃣ If not found, try: Cookie token
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // 3️⃣ If still no token → block access
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
      // 4️⃣ Verify token
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified;

      // 5️⃣ Role-based check
      if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  };
};
