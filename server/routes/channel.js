const Router = require('koa-router');
const router = new Router();
const handlers = require('../handlers');

router.post('/channel', async ctx => {
    try {
        const result = await handlers.addChannel({...ctx.request.body});
        ctx.status = result.status;
        ctx.body = result;
    } catch (e) {
        console.log('err', e);
        if(e.code === 11000) {
            ctx.status = 400;
            ctx.body = { errorMessage: 'Sorry, that channel name is already taken' };
            return;
        }
        ctx.status = 500;
        ctx.body = e.message || 'Internal server error';
    }
});

router.get('/channels', async ctx => {
   try {
       const result = await handlers.getChannels();
       ctx.status = result.status;
       ctx.body = result;
   } catch (e) {
       console.log('err', e);
       ctx.status = 500;
       ctx.body = e.message || 'Internal server error';
   }
});

router.get('/channel/:channelId', async ctx => {
    try {
        const result = await handlers.getChannelById(ctx.params.channelId);
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

router.del('/channel/:channelId', async ctx => {
    try {
        const result = await handlers.deleteChannelById(ctx.params.channelId);
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

module.exports = router;