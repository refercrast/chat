const Router = require('koa-router');
const router = new Router();
const channelHandler = require('../handlers/channel');
const messageHandler = require('../handlers/message');
const userHandler = require('../handlers/user');
const { io } = require('../socket');

const { NEW_CHANNEL, DELETE_CHANNEL } = require('../socket/socketEvents');

router.post('/channel', async ctx => {
    let { title } = ctx.request.body;

    if (!title || title.trim() === '') {
        ctx.throw(400, 'Title is required');
    }

    title = title.trim();

    if (title.length > 30) {
        ctx.throw(400, 'Length of the title should be less than 30 characters' );
    }

    const titleIsExisting = await channelHandler.getChannelsCount(title);

    if (titleIsExisting) {
        ctx.throw(400, `Sorry, channel with '${title}' title is already taken` );
    }

    const channel = {
        title,
        ownerId: ctx.appUser._id,
        created: Date.now()
    };

    const result = await channelHandler.addChannel(channel);
    await userHandler.addChannel(ctx.appUser._id, result._id);
    io.emit(NEW_CHANNEL, result);
    ctx.status = 201;
    ctx.body = result;
});

router.get('/channels', async ctx => {
    let result = await channelHandler.getChannels(ctx.appUser.channels);
    ctx.status = 200;
    ctx.body = result;
});

router.get('/channel/:channelId', async ctx => {
    const result = await channelHandler.getChannelById(ctx.params.channelId);
    ctx.status = 200;
    ctx.body = result;
});

router.del('/channel/:channelId', async ctx => {
    const { channelId } = ctx.params;

    const channel = await channelHandler.getChannelById(channelId);

    if (!channel) {
        ctx.throw(404, 'Channel not found')
    }

    if (channel.ownerId.toString() === ctx.appUser._id.toString()) {
        await channelHandler.deleteChannel(channelId);
        messageHandler.deleteAllByChannel(channelId);
        io.emit(DELETE_CHANNEL, channelId);
        ctx.status = 204;
    } else {
        ctx.throw(403);
    }
});

module.exports = router;