const Discord = require('discord.js');
const TOKEN = "stop";
const PREFIX = "!";
const fs = require("fs");

let players = JSON.parse(fs.readFileSync("players.json", "utf8"));

commands = new Discord.Collection();

console.log(`above`);
fs.readdir("./cmds/", (err, files) => {

  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  console.log(files);

  jsfile.forEach((f, i) =>{
    console.log(f);
    let props = require(`./cmds/${f}`);
    console.log(`./cmds/${f} loaded!`);
    commands.set(props.help.name, props);
  });
});

var members = [];


var request = require('request');

var bot = new Discord.Client();

bot.on("ready", function() {
    console.log(`Bot Started on ${bot.guilds.size} servers`);
    bot.user.setPresence({ game: { name: "https://hypixel.net", type: 0 } });
});

bot.on("guildMemberAdd", function(member) {


});

bot.on("guildMemberRemove", function(member) {

});

bot.on("messageDeleted", function(msg) {

});

bot.on("message", async message => {
  if(message.author.bot) return;

  let prefix = "!";
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray;
  let commandfile = commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

});


bot.login(TOKEN);
