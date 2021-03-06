require('dotenv').config();
const koa = require('koa');
const cors = require('kcors');
const app = new koa();
const server = require('http').createServer(app.callback());
const { io } = require('./socket');
io.attach(server);
const koaBody = require('koa-body');
const socketManager = require('./socket/socketManager');
const auth = require('./middlewares/auth');

const channel = require('./routes/channel');
const message = require('./routes/message');
const user = require('./routes/user');
const authorization = require('./routes/authorization');

const port = process.env.PORT || 4000;

io.on('connection', socketManager);

function checkOriginAgainstWhitelist(ctx) {
    const requestOrigin = ctx.accept.headers.origin;
    if (!process.env.CORS_WHITELIST.split(' ').includes(requestOrigin)) {
        return ctx.throw(`🙈 ${requestOrigin} is not a valid origin`);
    }
    return requestOrigin;
}

app.use(cors({ origin: checkOriginAgainstWhitelist }));
app.use(koaBody());

// public routes
app.use(authorization.routes());
app.use(authorization.allowedMethods());

// protected routes
app.use(auth);
app.use(user.routes());
app.use(user.allowedMethods());
app.use(channel.routes());
app.use(channel.allowedMethods());
app.use(message.routes());
app.use(message.allowedMethods());

app.on('error', err => {
    err.message = JSON.stringify({ errorMessage: err.message || 'Internal server error' });
});

server.listen(port, console.log(`server start on port ${port}`));
