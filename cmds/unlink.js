const Discord = require("discord.js");
const request = require("request");
const fs = require("fs");
let players = JSON.parse(fs.readFileSync("players.json", "utf8"));
var exists = false;

module.exports.run = async (bot, message, args) => {

        console.log(players);

        for(var i = 0; i < players.links.length; i++) {
            var obj = players.links[i];
            console.log(obj);
            if (obj.discord == message.author.id) {
              exists = true;
              var name = obj.name;
              var position = i;
            }
        }

        console.log(exists);
        if (exists == true) {
          message.delete();
          message.reply("Your discord has been unlinked from " + name + "! To relink do !link!");
          players.links.splice(position);
          fs.writeFile("players.json", JSON.stringify(players), (err) => {
            if (err) console.error(err)
          });

        } else {
          message.delete();
          message.reply("Your account is not linked! Do !link to link your account!")
        }
}

module.exports.help = {
  name:"unlink"
}
