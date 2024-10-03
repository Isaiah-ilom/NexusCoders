const { addUser } = require('../database/db');

module.exports = {
    name: 'register',
    description: 'Register a user',
    async execute(client, msg, args) {
        const name = args.join(' ');
        if (!name) {
            return msg.reply('Please provide a name to register.');
        }

        try {
            await addUser(msg.from, name);
            msg.reply(`You've been registered as ${name}`);
        } catch (error) {
            console.error(error);
            msg.reply('There was an error registering you.');
        }
    },
};
