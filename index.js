const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
const { loadCommands } = require('./utils/commandLoader');
const { initDatabase } = require('./database/db');

const client = new Client({
    authStrategy: new LocalAuth()
});

const commands = loadCommands();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('NexusCoders bot is ready!');
    initDatabase();
});

client.on('message', async msg => {
    if (msg.body.startsWith('!')) {
        const args = msg.body.slice(1).trim().split(/ +/);
        const command = args.shift().toLowerCase();

        if (commands.has(command)) {
            try {
                commands.get(command).execute(client, msg, args);
            } catch (error) {
                console.error(error);
                msg.reply('There was an error executing that command.');
            }
        }
    }
});

client.initialize();
