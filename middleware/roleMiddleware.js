const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {

        if(requiredRole !== req.user.role) {
            return res.status(403).json({ err: 'Access Denied' });
        }

        next();
    }
}

module.exports = roleMiddleware;