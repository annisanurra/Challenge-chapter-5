const jwt = require('jsonwebtoken');

function checkToken(req, res, next)  {
 const token = req.header('Authorization');
  
 if (!token) {
    return res.status(401).json({ error: 'No token provided' });
 }
  
 try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded.user;
    next();
 } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
 }
};

module.exports = { 
    checkToken
}