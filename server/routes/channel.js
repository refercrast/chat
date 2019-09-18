const Router = require('koa-router');
const router = new Router();
const channelHandler = require('../handlers/channel');

router.post('/channel', async ctx => {
    try {
        let { title } = ctx.request.body;

        if (!title || title.trim() === '') {
            throw new Error("Title is required");
        }

        title = title.trim();

        //query case insensitive
        const isExisting = await channelHandler.getChannelByTitle(title);
        if (isExisting.length) {
            throw new Error(`Sorry, channel with "${title}" title is already taken`);
        }

        if (title.length > 30) {
            throw new Error("Length of the title should be less than 30 characters");
        }

        const channel = Object.assign({},{
            title,
            created: +new Date(),
            messages: []
        });

        const result = await channelHandler.addChannel(channel);
        ctx.status = 200;
        ctx.body = result;
    } catch (e) {
        console.log('err', e);
        ctx.status = 500;
        ctx.body = e.message || 'Internal server error';
    }
});
//
// router.get('/channels', async ctx => {
//    try {
//        const result = await channelHandler.getChannels();
//        ctx.status = result.status;
//        ctx.body = result;
//    } catch (e) {
//        console.log('err', e);
//        ctx.status = 500;
//        ctx.body = e.message || 'Internal server error';
//    }
// });
//
// router.get('/channel/:channelId', async ctx => {
//     try {
//         // переиминовать методы
//         const result = await channelHandler.getChannelById(ctx.params.channelId);
//         ctx.status = result.status;
//         ctx.body = result;
//     } catch (e) {
//         console.log('err', e);
//         if (e.name === 'CastError') {
//             ctx.status = 404;
//             ctx.body = { errorMessage: 'Channel not found' };
//             return;
//         }
//         ctx.status = 500;
//         ctx.body = e.message || 'Internal server error';
//     }
// });
//
// router.del('/channel/:channelId', async ctx => {
//     try {
//         const result = await channelHandler.deleteChannelById(ctx.params.channelId);
//         ctx.status = result.status;
//         ctx.body = result;
//     } catch (e) {
//         console.log('err', e);
//         if (e.name === 'CastError') {
//             ctx.status = 404;
//             ctx.body = { errorMessage: 'Channel not found' };
//             return;
//         }
//         ctx.status = 500;
//         ctx.body = e.message || 'Internal server error';
//     }
// });

module.exports = router;