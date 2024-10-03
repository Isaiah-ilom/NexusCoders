module.exports = {
    name: 'ping',
    description: 'Ping!',
    execute(client, msg, args) {
        msg.reply('Pong!');
    },
};
