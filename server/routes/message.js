const Router = require('koa-router');
const router = new Router();
const message = require('../handlers/message');

router.post('/message/:channelId', async ctx => {
    try {
        const result = await message.addMessage({ ...ctx.request.body }, ctx.params);
        ctx.status = result.status;
        ctx.body = result;
    } catch (e) {
        console.log('err', e);
        if (e.name === 'CastError') {
            ctx.status = 404;
            ctx.body = { errorMessage: 'Channel not found' };
            return;
        }
        ctx.status = 500;
        ctx.body = e.message || 'Internal server error';
    }
});

router.get('/messages/:channelId', async ctx => {
    try {
        const result = await message.getMessagesByChannelId(ctx.params, ctx.request.query);
        ctx.status = result.status;
        ctx.body = result;
    } catch (e) {
        console.log('err', e);
        if (e.name === 'CastError') {
            ctx.status = 404;
            ctx.body = { errorMessage: 'Channel not found' };
            return;
        }
        ctx.status = 500;
        ctx.body = e.message || 'Internal server error';
    }
});

router.put('/message/:messageId', async ctx => {
    try {
        const result = await message.editMessageByMessageId({ ...ctx.request.body }, ctx.params);
        ctx.status = result.status;
        ctx.body = result;
    } catch (e) {
        console.log('err', e);
        if (e.name === 'CastError') {
            ctx.status = 404;
            ctx.body = { errorMessage: 'Message not found' };
            return;
        }
        ctx.status = 500;
        ctx.body = e.message || 'Internal server error';
    }
});

router.del('/message/:messageId', async ctx => {
   try {
       const result = await message.deleteMessageByMessageId(ctx.params);
       ctx.status = result.status;
       ctx.body = result;
   } catch (e) {
       console.log('err', e);
       if (e.name === 'CastError') {
           ctx.status = 404;
           ctx.body = { errorMessage: 'Message not found' };
           return;
       }
       ctx.status = 500;
       ctx.body = e.message || 'Internal server error';
   }
});

module.exports = router;