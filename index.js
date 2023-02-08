let dotenv =  require('dotenv');
dotenv.config('.env');
const sade = require('sade');
const prog = sade('kaadon_socket');
const version = '1.0.1';
const socketServer = require("./src/commands/socket.io")

prog.version(`v${version}. Copyright 2021 Kaadon.`)
    .describe(`kaadon_socket v${version}. Copyright 2021 Kaadon By kaadon.com`);

prog.command('io')
    .describe('io server')
    .action(() => {
        socketServer()
    });

prog.command('update')
    .describe('Check new version of kaadon_socket.')
    .action(() => {
        console.log('Not implemented yet');
    });

prog.parse(process.argv);