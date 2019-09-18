const monk = require('monk');
const url = 'mongodb://localhost/chat';
module.exports = db = monk(url, { useUnifiedTopology: true });

db.then(() => {
    console.log('Connected correctly to server');
});