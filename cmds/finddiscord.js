const Discord = require("discord.js");
const request = require("request");
const fs = require("fs");
let players = JSON.parse(fs.readFileSync("players.json", "utf8"));

module.exports.run = async (bot, message, args) => {
    if (args.length != 2) {
        message.reply("Please use !finddiscord (Username)");
    } else {



        console.log(players);
    }
}

module.exports.help = {
  name:"finddiscord"
}
