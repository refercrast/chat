const Router = require('koa-router');
const router = new Router();
const messageHandler = require('../handlers/message');
const channelHandler = require('../handlers/channel');
const auth = require('../middlewares/auth');
const { io } = require('../socket');
const { NEW_MESSAGE, EDIT_MESSAGE, DELETE_MESSAGE } = require('../socket/socketEvents');

router.post('/message/:channelId', async ctx => {
    let message = ctx.request.body.message;

    // one of - [channelAction, user]
    let messageType = ctx.request.body.messageType;

    if (messageType && messageType !== "channelAction") {
        ctx.throw(400, 'Incorrect type of message');
    }

    const { channelId } = ctx.params;

    const channel = await channelHandler.getChannelById(channelId);

    if (!channel) {
        ctx.throw(404, 'Channel not found');
    }

    if (!message || message.trim() === '') {
        ctx.throw(400, 'Message is required');
    }

    message = message.trim();

    const messageObj = {
        message,
        created: +new Date(),
        channelId,
        ownerId: ctx.appUser._id,
        ownerName: ctx.appUser.username,
        messageType: messageType || "user"
    };

    const result = await messageHandler.addMessage(messageObj);
    io.to(channelId).emit(NEW_MESSAGE, result);
    ctx.status = 201;
    ctx.body = result;
});

router.get('/messages/:channelId', async ctx => {
    const { channelId } = ctx.params;
    const condition = ctx.request.query;
    let messages = await messageHandler.getMessagesByChannel(channelId);

    if (condition.before && condition.after === undefined) {
        messages = messages.filter(message => message.created < +condition.before);
    } else if (condition.after && condition.before === undefined) {
        messages = messages.filter(message => message.created > +condition.after);
    } else if (condition.after && condition.before) {
        if (condition.before < condition.after) {
            ctx.throw(400, 'Incorrect range of dates');
        }
        messages = messages.filter(message => message.created > +condition.after && message.created < +condition.before);
    }

    ctx.status = 200;
    ctx.body = messages;
});

router.put('/message/:messageId', async ctx => {
    const { message } = ctx.request.body;
    const { messageId } = ctx.params;

    if (!message || message.trim() === '') {
        ctx.throw(400, 'Message is required');
    }

    const currentMessage = await messageHandler.getMessage(messageId);

    if (!currentMessage) {
        ctx.throw(404, 'Message not found');
    }

    if (currentMessage.ownerId.toString() === ctx.appUser._id.toString()) {
        const result = await messageHandler.editMessage(messageId, message);
        io.to(result.channelId).emit(EDIT_MESSAGE, result);
        ctx.status = 200;
        ctx.body = result;
    } else {
       ctx.throw(403);
    }
});

router.del('/message/:messageId', auth, async ctx => {
   const { messageId } = ctx.params;

   const message = await messageHandler.getMessage(messageId);

   if (!message) {
       ctx.throw(404, 'Message not found');
   }

   if (message.ownerId.toString() === ctx.appUser._id.toString()) {
       await messageHandler.deleteMessage(messageId);
       io.to(message.channelId).emit(DELETE_MESSAGE, messageId);
       ctx.status = 204;
   } else {
       ctx.throw(403);
   }
});

module.exports = router;