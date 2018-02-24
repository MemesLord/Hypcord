const Discord = require("discord.js");
const request = require("request");

module.exports.run = async (bot, message, args) => {
    if (args[1] != null) {
        var url = 'https://api.mojang.com/users/profiles/minecraft/' + args[1];
                request(url, function(err, response, body2) {
                if(err) {
                    console.log(err);
                    return message.reply('Error...');
                }
                    try {
                      var body2 = JSON.parse(body2);
                   } catch(err) {
                      console.log(err);
                      message.reply("That is not a valid minecraft player.");
                      return;
                   }


                var names = [];

                message.reply("Fetching names for " + args[1]);
                var url = 'https://api.mojang.com/user/profiles/' + body2.id + "/names";
                request(url, function(err, response, body) {
                    if(err) {
                        console.log(err);
                        return message.reply('Error...');
                    }
                    var body = JSON.parse(body);

                    var i = 0;

                    for (var i = 0; i < body.length; i++) {
                        names.push(body[i].name);
                    }

                    var namelist = names.join(", ");

                    const embed = new Discord.RichEmbed()
                      .setTitle("Name History")
                      .setURL("https://namemc.com")
                      .setAuthor(body2.name + "'s " + body.length + " past names", "https://crafatar.com/avatars/" + body2.name)
                      /*
                       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
                       */
                      .setColor(0xF59F00)
                      .setDescription(" ")
                      .setFooter("Created by Parker Smith", "https://scontent-atl3-1.cdninstagram.com/t51.2885-19/s320x320/23733731_402009370213446_127911586433073152_n.jpg")
                      .setThumbnail("https://crafatar.com/avatars/" + body2.name)
                      /*
                       * Takes a Date object, defaults to current date.
                       */
                      .setTimestamp()
                      .addField("Name", body2.name)
                      .addField("UUID", body2.id)
                      /*
                       * Inline fields may not display as inline if the thumbnail and/or image is too big.
                       */
                      .addField("Past Names", namelist)
                      /*
                       * Blank field, useful to create some space.
                       */

                      message.channel.send({embed});
                    names = [];
                });
                        });
    } else {
        message.reply("Please use !namehistory (Player)");
    }
}

module.exports.help = {
  name:"namehistory"
}
