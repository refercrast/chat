const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Router = require('koa-router');
const router = new Router();
const userHandler = require('../handlers/user');
const channelHandler = require('../handlers/channel');
const auth = require('../middlewares/auth');

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

        const { _id } = await userHandler.addUser({ username, password, channels: [] });

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

router.put('/user/add-channel/:channelId', auth, async ctx => {
    try {
        const { _id } = ctx.decoded;
        const { channelId } = ctx.params;
        let user = await userHandler.getUserById(_id);

        if (!user) {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Unauthorized access' };
            return;
        }
        const currentChannel = await channelHandler.getChannelById(channelId);
        if (!currentChannel) {
            ctx.status = 400;
            ctx.body = { errorMessage: "Channel not found" };
            return;
        }

        const joined = user.channels.some(id => id.toString() === channelId.toString());
        if (joined) {
            ctx.status = 400;
            ctx.body = { errorMessage: "Current user is already joined" };
            return;
        }

        const result = await userHandler.addChannel(user._id, channelId);
        ctx.status = 200;
        ctx.body = result;
    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error'};
    }
});

router.get('/user/channels', auth, async ctx => {
    try {
        const { _id } = ctx.decoded;
        let user = await userHandler.getUserById(_id);

        if (!user) {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Unauthorized access' };
            return;
        }

        let result = await channelHandler.getChannelsByIds(user.channels);

        ctx.status = 200;
        ctx.body = result;
    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error'};
    }
});

module.exports = router;

