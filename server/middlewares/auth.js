const jwt = require('jsonwebtoken');
const userHandler = require('../handlers/user');

module.exports = async (ctx, next) => {
    if (ctx.headers.authorization) {
        const token = ctx.headers.authorization.split(' ')[1];
        await jwt.verify(token, process.env.SECRET, async (err, decoded) => {
            if (err) {
                ctx.throw(401);
            } else {
                ctx.appUser = await userHandler.getUserById(decoded._id);
                return next();
            }
        });
    } else {
        ctx.throw(401);
    }
};