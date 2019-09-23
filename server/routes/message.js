const Router = require('koa-router');
const router = new Router();
const messageHandler = require('../handlers/message');
const channelHandler = require('../handlers/channel');
const userHandler = require('../handlers/user');
const auth = require('../middlewares/auth');

router.post('/message/:channelId', auth, async ctx => {
    try {
        const { _id } = ctx.decoded;
        let { message } = ctx.request.body;
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
            channelId,
            ownerId: user._id
        };

        const result = await messageHandler.addMessage(messageObj);

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
        const { channelId } = ctx.params;
        const condition = ctx.request.query;
        let messages = await messageHandler.getMessagesByChannel(channelId);

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

router.put('/message/:messageId', auth, async ctx => {
    try {
        const { _id } = ctx.decoded;
        const { message } = ctx.request.body;
        const { messageId } = ctx.params;

        let user = await userHandler.getUserById(_id);

        if (!user) {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Unauthorized access' };
            return;
        }

        if (!message || message.trim() === '') {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Message is required' };
            return;
        }

        const currentMessage = await messageHandler.getMessage(messageId);

        if (!currentMessage) {
            ctx.status = 404;
            ctx.body = { errorMessage: 'Message not found' };
            return;
        }

        if (currentMessage.ownerId.toString() === user._id.toString()) {
            const result = await messageHandler.editMessage(messageId, message);

            ctx.status = 200;
            ctx.body = result;
        } else {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Permission denied' };
        }

    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = { errorMessage: e.message || 'Internal server error' };
    }
});

router.del('/message/:messageId', auth, async ctx => {
   try {
       const { _id } = ctx.decoded;
       const { messageId } = ctx.params;

       const user = await userHandler.getUserById(_id);

       if (!user) {
           ctx.status = 400;
           ctx.body = { errorMessage: 'Unauthorized access' };
           return;
       }

       const message = await messageHandler.getMessage(messageId);

       if (!message) {
           ctx.status = 404;
           ctx.body = { errorMessage: 'Message not found' };
           return;
       }

       if (message.ownerId.toString() === user._id.toString()) {
           await messageHandler.deleteMessage(messageId);
           ctx.status = 204;
       } else {
           ctx.status = 403;
           ctx.body = { errorMessage: 'Permission denied' };
       }

   } catch (e) {
       console.log('err', e);
       ctx.status = 500;
       ctx.body = { errorMessage: e.message || 'Internal server error' };
   }
});

module.exports = router;