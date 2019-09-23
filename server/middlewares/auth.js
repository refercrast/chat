const jwt = require('jsonwebtoken');

module.exports = async (ctx, next) => {
    try {
        if (ctx.headers.authorization) {
            const token = ctx.headers.authorization.split(' ')[1];
            await jwt.verify(token, process.env.SECRET, (err, decoded) => {
                if (err) {
                    throw new Error('Token error');
                } else {
                    ctx.decoded = decoded;
                    return next();
                }
            });
        }
        else {
            throw new Error('No token provided');
        }
    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error'};
    }
};