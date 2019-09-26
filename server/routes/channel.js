const Router = require('koa-router');
const router = new Router();
const channelHandler = require('../handlers/channel');
const messageHandler = require('../handlers/message');
const userHandler = require('../handlers/user');
const { io } = require('../socket');

const { NEW_CHANNEL, DELETE_CHANNEL } = require('../socket/socketEvents');

const auth = require('../middlewares/auth');

router.post('/channel', auth, async ctx => {
    try {
        const { _id } = ctx.decoded;
        let { title } = ctx.request.body;
        let user = await userHandler.getUserById(_id);

        if (!user) {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Unauthorized access' };
            return;
        }

        if (!title || title.trim() === '') {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Title is required' };
            return;
        }

        title = title.trim();

        if (title.length > 30) {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Length of the title should be less than 30 characters' };
            return;
        }

        const titleIsExisting = await channelHandler.getChannelsCount(title);

        if (titleIsExisting) {
            ctx.status = 400;
            ctx.body = { errorMessage: `Sorry, channel with '${title}' title is already taken` };
            return;
        }

        const channel = {
            title,
            ownerId: user._id,
            created: +new Date()
        };

        const result = await channelHandler.addChannel(channel);

        io.emit(NEW_CHANNEL);
        ctx.status = 201;
        ctx.body = result;
    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error'};
    }
});

router.get('/channels', async ctx => {
   try {
       const result = await channelHandler.getChannels();
       ctx.status = 200;
       ctx.body = result;
   } catch (e) {
       console.log('err', e);
       ctx.status = 500;
       ctx.body = { errorMessage: e.message || 'Internal server error'};
   }
});

router.get('/channel/:channelId', async ctx => {
    try {
        const result = await channelHandler.getChannelById(ctx.params.channelId);
        ctx.status = 200;
        ctx.body = result;
    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error'};
    }
});

router.del('/channel/:channelId', auth, async ctx => {
    try {
        const { _id } = ctx.decoded;
        const { channelId } = ctx.params;
        let user = await userHandler.getUserById(_id);

        if (!user) {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Unauthorized access' };
            return;
        }

        const channel = await channelHandler.getChannelById(channelId);

        if (!channel) {
            ctx.status = 404;
            ctx.body = { errorMessage: 'LeftSideBar not found' };
            return;
        }

        if (channel.ownerId.toString() === user._id.toString()) {
            await channelHandler.deleteChannel(channelId);
            messageHandler.deleteAllByChannel(channelId);
            io.emit(DELETE_CHANNEL);
            ctx.status = 204;
        } else {
            ctx.status = 403;
            ctx.body = { errorMessage: 'Permission denied' };
        }

    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error'};
    }
});

module.exports = router;