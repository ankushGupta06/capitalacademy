const jwt = require('jsonwebtoken');
require('dotenv').config();

/**
 * Middleware for authentication and role-based authorization.
 * 
 * Usage:
 *   app.get('/admin', authenticateToken(['admin']), handler);
 *   app.get('/faculty', authenticateToken(['faculty', 'admin']), handler);
 *   app.get('/public', authenticateToken(), handler); // no role restriction
 */
module.exports = function authenticateToken(allowedRoles = []) {
  return (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

    if (!token)
      return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
      const verified = jwt.verify(token, process.env.JWT_SECRET);
      req.user = verified; // { id, email, role }

      // ✅ Role check (only if roles are specified)
      if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
      }

      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
  };
};
