const Router = require('koa-router');
const router = new Router();
const messageHandler = require('../handlers/message');
const channelHandler = require('../handlers/channel');

router.post('/message/:channelId', async ctx => {
    try {
        let { message } = ctx.request.body;
        const { channelId } = ctx.params;

        const channel = await channelHandler.getChannelById(channelId);

        if (!channel) {
            ctx.status = 404;
            ctx.body = { errorMessage: 'Channel not found' };
            return;
        }

        if (!message || message.trim() === '') {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Message is required' };
            return;
        }

        message = message.trim();

        const messageObj = {
            message,
            created: +new Date(),
            channelId: channel._id
        };

        const result = await messageHandler.addMessage(messageObj);
        await channelHandler.addMessage(channelId, { _id: result._id, created: result.created });

        ctx.status = 201;
        ctx.body = result;
    } catch (e) {
        console.log('error:', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error' };
    }
});

router.get('/messages/:channelId', async ctx => {
    try {
        const channel = await channelHandler.getChannelById(ctx.params.channelId);
        const condition = ctx.request.query;
        let messages = [];

        if (!channel) {
            ctx.status = 404;
            ctx.body = { errorMessage: 'Channel not found' };
            return;
        }

        await Promise.all(channel.messages.map(async messageObject => {
           const message = await messageHandler.getMessage(messageObject._id);
           messages.push(message);
        }));

        if (condition.before && condition.after === undefined) {
            messages = messages.filter(message => message.created < +condition.before);
        } else if (condition.after && condition.before === undefined) {
            messages = messages.filter(message => message.created > +condition.after);
        } else if (condition.after && condition.before) {
            if (condition.before < condition.after) {
                ctx.status = 400;
                ctx.body = { errorMessage: 'Incorrect range of dates' };
                return;
            }
            messages = messages.filter(message => message.created > +condition.after && message.created < +condition.before);
        }

        ctx.status = 200;
        ctx.body = messages;
    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error' };
    }
});

router.put('/message/:messageId', async ctx => {
    try {
        const { message } = ctx.request.body;
        const { messageId } = ctx.params;

        if (!message || message.trim() === '') {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Message is required' };
            return;
        }

        const result = await messageHandler.editMessage(messageId, message);
        if (!result) {
            ctx.status = 200;
            ctx.body = { errorMessage: 'Message not found' };
            return;
        }
        ctx.status = 200;
        ctx.body = result;
    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error' };
    }
});

router.del('/message/:messageId', async ctx => {
   try {
       const { messageId } = ctx.params;
       const message = await messageHandler.getMessage(messageId);
       if (message) {
           await messageHandler.deleteMessage(messageId);
           await channelHandler.deleteMessage(message.channelId, messageId);
       }
       ctx.status = 204;
   } catch (e) {
       console.log('err', e);
       ctx.status = 500;
       ctx.body = { errorMessage: e.message || 'Internal server error' };
   }
});

module.exports = router;