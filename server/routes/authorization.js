const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Router = require('koa-router');
const router = new Router();
const userHandler = require('../handlers/user');

router.post('/user/register', async ctx => {
    let { email, firstName, password } = ctx.request.body;

    if (!email || !firstName || !password) {
        ctx.throw(400, 'email, firstName, password are required');
    }

    email = email.trim();
    firstName = firstName.trim();
    password = password.trim();

    if (!email || !firstName || !password) {
        ctx.throw(400, 'email or firstName or password shouldn`t be empty');
    }

    if (process.env.INCORRECT_EMAILS.split(' ').includes(email) ) {
        ctx.throw(400, 'incorrect email');
    }
    console.log(process.env.INCORRECT_SYMBOLS.indexOf(email))
    if (email.indexOf(process.env.INCORRECT_SYMBOLS)) {
        ctx.throw(400, 'incorrect email');
    }

    const userIsExisting = await userHandler.getUsersCount(email);

    if (userIsExisting) {
        ctx.throw(400, 'Sorry, that email is already taken');
    }

    password = await bcrypt.hash(password, 10);

    const { _id } = await userHandler.addUser({ email, firstName, password, channels: [] });

    const token = jwt.sign({ _id, email, firstName }, process.env.SECRET);
    ctx.status = 201;
    ctx.body = { token };
});

router.post('/user/login', async ctx => {
    const { email, password } = ctx.request.body;

    if (!email || !password) {
        ctx.throw(400, 'Email or password are required');
    }

    const user = await userHandler.getUserByEmail(email);
    const valid = user && await bcrypt.compare(password, user.password);

    if (valid) {
        const token = jwt.sign({ _id: user._id, email, firstName: user.firstName }, process.env.SECRET);
        ctx.status = 200;
        ctx.body = { token };
    } else {
        ctx.throw(400, 'Invalid Email/Password');
    }
});

module.exports = router;
