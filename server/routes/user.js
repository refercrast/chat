const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Router = require('koa-router');
const router = new Router();
const userHandler = require('../handlers/user');

router.post('/user/register', async ctx => {
    try {
        let { username, password } = ctx.request.body;

        if (!username || !password) {
            ctx.status = 400;
            ctx.body = { errorMessage: 'username or password are required' };
            return;
        }

        const userIsExisting = await userHandler.getUsersCount(username);

        if (userIsExisting) {
            ctx.status = 400;
            ctx.body = { errorMessage: `Sorry, that username is already taken` };
            return;
        }

        password = await bcrypt.hash(password, 10);

        const { _id } = await userHandler.addUser({ username, password });

        const token = jwt.sign({ _id, username }, process.env.SECRET);
        ctx.status = 201;
        ctx.body = { token };
    } catch (e) {
        console.log('error:', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error' };
    }
});

router.post('/user/login', async ctx => {
    try {
        const { username, password } = ctx.request.body;

        if (!username || !password) {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Username or password are required' };
            return;
        }

        const user = await userHandler.getUserByUserName(username);
        const valid = user && await bcrypt.compare(password, user.password);

        if (valid) {
            const token = jwt.sign({ _id: user._id, username }, process.env.SECRET);
            ctx.status = 201;
            ctx.body = { token };
        } else {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Invalid Username/Password' };
        }
    } catch (e) {
        console.log('error:', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error' };
    }
});

module.exports = router;

