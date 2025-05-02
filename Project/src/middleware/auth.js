const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;
const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];
    const refreshToken = req.cookies.refreshToken || req.headers['x-refresh-token'];
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    try {
        const decode = jwt.verify(token, secretKey);
        req.user = decode;
        next();
    } catch (error) {
         return getToken(req, res, next, refreshToken);
    }
};

function getToken(req, res, next, refreshToken) {

    if(!refreshToken)
        return res.redirect('/');
    try{
        const decode  = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newToken = jwt.sign({id: decode.id}, process.env.JWT_SECRET, {expiresIn: '1m'});
        res.cookie('token', newToken, { httpOnly: true });
        req.user = decode;
        next();
    }catch (error) {
        console.error('Error refreshing token:', error);
        res.redirect('/');
    }
}
module.exports = authMiddleware;
