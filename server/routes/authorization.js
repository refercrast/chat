const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Router = require('koa-router');
const router = new Router();
const userHandler = require('../handlers/user');

router.post('/user/register', async ctx => {
    let { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.throw(400, 'Username or password are required');
    }

    const userIsExisting = await userHandler.getUsersCount(username);

    if (userIsExisting) {
        ctx.throw(400, 'Sorry, that username is already taken');
    }

    password = await bcrypt.hash(password, 10);

    const { _id } = await userHandler.addUser({ username, password, channels: [] });

    const token = jwt.sign({ _id, username }, process.env.SECRET);
    ctx.status = 201;
    ctx.body = { token };
});

router.post('/user/login', async ctx => {
    const { username, password } = ctx.request.body;

    if (!username || !password) {
        ctx.throw(400, 'Username or password are required');
    }

    const user = await userHandler.getUserByUserName(username);
    const valid = user && await bcrypt.compare(password, user.password);

    if (valid) {
        const token = jwt.sign({ _id: user._id, username }, process.env.SECRET);
        ctx.status = 200;
        ctx.body = { token };
    } else {
        ctx.throw(400, 'Invalid Username/Password');
    }
});

module.exports = router;
