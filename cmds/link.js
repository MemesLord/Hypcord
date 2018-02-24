const Discord = require("discord.js");
const request = require("request");
const fs = require("fs");
let players = JSON.parse(fs.readFileSync("players.json", "utf8"));
var exists = false;


module.exports.run = async (bot, message, args) => {
    if (args.length != 2) {
        message.reply("Please use !link (API Key) - You can get this by doing /api in-game");
    } else {

      for(var i = 0; i < players.links.length; i++) {
          var obj = players.links[i];
          console.log(obj);
          if (obj.discord == message.author.id) {
            exists = true;
          }
      }
      console.log(exists);

        if (exists == false) {
            message.delete();
            var key = args[1];
            var url = 'https://api.hypixel.net/key?key=' + key;
            request(url, function(err, response, body) {
                if(err) {
                    console.log(err);
                    return message.reply('Error...');
                }
                var body = JSON.parse(body);
                if (body.success != true) {
                    message.reply("That is an invalid API key! - You can get your api key by doing /api in-game");
                } else {
                    var url = 'https://api.hypixel.net/player?key=apikey&uuid=' + body.record.ownerUuid;
                    request(url, function(err, response, body2) {
                    if(err) {
                        console.log(err);
                        return message.reply('Error...');
                    }
                    var body2 = JSON.parse(body2);
                    players.links.push({"uuid":body.record.ownerUuid,"discord":message.author.id,"name":body2.player.displayname});

                    fs.writeFile("players.json", JSON.stringify(players), (err) => {
                      if (err) console.error(err)
                    });
                    message.reply("Your discord has been linked to " + body2.player.displayname + "! Other users of the bot can now search for your discord. If you are not okay with this please do !unlink.");
                    });

                }
            });
          } else {
            message.delete();
            message.reply("You have already linked your account! Do !unlink to unlink it!")
          }
    }
}

module.exports.help = {
  name:"link"
}
