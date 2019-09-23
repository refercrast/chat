require('dotenv').config();
const koa = require('koa');
const app = new koa();
const server = require('http').createServer(app.callback());
const io = module.exports.io = require('socket.io')(server);
const koaBody = require('koa-body');
const socketManager = require('./socket/socketManager');

const channel = require('./routes/channel');
const message = require('./routes/message');
const user = require('./routes/user');

const port = process.env.PORT || 4000;

io.on('connection', socketManager);

app.use(koaBody());

app.use(channel.routes());
app.use(channel.allowedMethods());

app.use(message.routes());
app.use(message.allowedMethods());

app.use(user.routes());
app.use(user.allowedMethods());

server.listen(port, console.log(`server start on port ${port}`));
