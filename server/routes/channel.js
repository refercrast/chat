const Router = require('koa-router');
const router = new Router();
const channelHandler = require('../handlers/channel');
const messageHandler = require('../handlers/message');

router.post('/channel', async ctx => {
    try {
        let { title } = ctx.request.body;

        if (!title || title.trim() === '') {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Title is required' };
            return;
        }

        title = title.trim();

        const titleIsExisting = await channelHandler.getChannelByTitle(title)
            .then(channels => channels.some(channel => channel.title.toLowerCase() === title.toLowerCase()));

        if (titleIsExisting) {
            ctx.status = 400;
            ctx.body = { errorMessage: `Sorry, channel with '${title}' title is already taken` };
            return;
        }

        if (title.length > 30) {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Length of the title should be less than 30 characters' };
            return;
        }

        const channel = {
            title,
            created: +new Date(),
            messages: []
        };

        const result = await channelHandler.addChannel(channel);
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

router.del('/channel/:channelId', async ctx => {
    try {
        const { channelId } = ctx.params;

        const channel = await channelHandler.getChannelById(channelId);
        if (channel) {
            await channelHandler.deleteChannel(ctx.params.channelId);
            channel.messages.map(async message => {
                await messageHandler.deleteMessage(message._id);
            });
        }
        ctx.status = 204;
    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error'};
    }
});

module.exports = router;