'use strict';
// Import the discord.js module and others
const Discord = require('discord.js');
const fs = require('fs');

// Create an instance of a Discord client
const client = new Discord.Client();
// import token and database
const credentials = require('./auth.json');
//defines channels
const sourceID = '835936713435906119';
const destinationID = '835936892268183552';

//sets ready presense
client.on('ready', () => {
  client.user.setPresence({
    status: 'online',
    activity: {
        name: 'for messages',
        type: "WATCHING"
    }
  });
  //list server
  client.guilds.cache.forEach(guild => {
    console.log(`${guild.name} | ${guild.id}`);
  });
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
	//set presence
   client.user.setPresence({
      status: 'online',
		activity: {
         name: 'for messages',
         type: "WATCHING"
      }
   });
	if(message.channel.id === sourceID){
		let storedMessage = message.content;
		let author = message.guild.members.cache.get(message.author.id).displayName;
		storedMessage += ` *- from ${author}*`;
		message.delete().catch(error=>{console.log('failed to delete message, maybe no permissions?')});
		client.channels.cache.get(destinationID).send(storedMessage).catch(error=>{console.log('couldnt write to destination, maybe no permissions?')});
	}
	else if(message.channel.id === '835937372042297374'){
		let storedMessage = message.content;
		let author = message.guild.members.cache.get(message.author.id).displayName;
		storedMessage += ` *- from ${author}*`;
		message.delete().catch(error=>{console.log('failed to delete message, maybe no permissions?')});
		client.channels.cache.get('835937429885550662').send(storedMessage).catch(error=>{console.log('couldnt write to destination, maybe no permissions?')});
	}
});
// Log our bot in using the token from https://discord.com/developers/applications
client.login(`${credentials.token}`);
