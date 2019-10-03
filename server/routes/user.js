const Router = require('koa-router');
const router = new Router();
const userHandler = require('../handlers/user');
const channelHandler = require('../handlers/channel');

router.put('/user/add-channel/:channelId', async ctx => {
    const { channelId } = ctx.params;

    const currentChannel = await channelHandler.getChannelById(channelId);
    if (!currentChannel) {
        ctx.throw(404, "Channel not found");
    }

    const joined = ctx.appUser.channels.some(id => id.toString() === channelId.toString());

    if (joined) {
        ctx.throw(400, "Current user is already joined");
    }

    const result = await userHandler.addChannel(ctx.appUser._id, channelId);
    ctx.status = 200;
    ctx.body = result;
});

router.get('/user/channels', async ctx => {
    let result = await channelHandler.getChannelsByIds(ctx.appUser.channels);
    ctx.status = 200;
    ctx.body = result;
});

module.exports = router;

