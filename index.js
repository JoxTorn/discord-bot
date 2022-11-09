const Discord = require("discord.js");
const fs = require('fs');
var path = require('path');

//Initating discord client
//Initating discord client
const client = new Discord.Client({
	intents: [
        //just add all
		Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildBans,
		Discord.GatewayIntentBits.GuildEmojisAndStickers,
        Discord.GatewayIntentBits.GuildIntegrations,
        Discord.GatewayIntentBits.GuildInvites,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildMessageReactions,
        Discord.GatewayIntentBits.GuildMessageTyping,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.GuildPresences,
        Discord.GatewayIntentBits.GuildScheduledEvents,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildVoiceStates,
        Discord.GatewayIntentBits.GuildWebhooks,
        
		Discord.GatewayIntentBits.MessageContent,

        Discord.GatewayIntentBits.DirectMessageReactions,
        Discord.GatewayIntentBits.DirectMessageTyping,
        Discord.GatewayIntentBits.DirectMessages
	],
}); 
//If there is no force fatch users some users will not be fetch and will have problem if i tyr to access then ove guild members list
//https://github.com/discordjs/discord.js/issues/230

const config = require("./config.json");
// We also need to make sure we're attaching the config to the CLIENT so it's accessible everywhere!
client.config = config;

//Set bot token 
client.config.token = process.env.token; //'NTUyMjEzNDM5ODc2MDM4NjU3.GVySGi.HmlSFL04APlAqMmIGOTFUHscKcK1-0NlnUFM1U';//

//setting export path to go to export directory
client.config.exportPath = __dirname;

client.commands = {};

//Loading all commands
fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        let props = require(`./commands/${file}`);
        let commandName = file.split(".")[0];
        console.log(`Attempting to load command ${commandName}`);
        client.commands[commandName] = props;
    });
});

//Loading all events
fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        console.log(`Attempting to load event ${eventName}`);
        client.on(eventName, event.bind(null, client));
    });
});

//Loading all jobs
fs.readdir("./jobs/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
        if (!file.endsWith(".js")) return;
        const job = require(`./jobs/${file}`);
        let jobName = file.split(".")[0];
        console.log(`Attempting to load job ${jobName}`);
        job.run(client);
    });
});

//Log in to discord
client.login(client.config.token);
