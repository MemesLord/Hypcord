const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    if (!args.length > 3) {
        message.reply("Please do !suggest (Suggestion)");
    } else {
        message.delete();
        var arg1 = args.join(" ").slice(8);

        bot.guilds.get("354694491342372865").fetchMembers().then(data => {
          bot.guilds.get("354694491342372865").fetchMember("139555832923684864")
          .then(member => {
            member.send({embed: {
              color: 3447003,
              author: {
                name: bot.user.username,
                icon_url: bot.user.avatarURL
              },
              title: "New Suggestion",
              url: "https://yeetdev.com",
              description: "A new suggestion was submitted.",
              fields: [{
                  name: "Suggestion",
                  value: arg1
                },
                {
                  name: "Author",
                  value: "<@" + message.author.id + ">"
                },
                {
                  name: "Discord Server",
                  value: message.guild.name + " (" + message.guild.id + ")"
                }
              ],
              timestamp: new Date(),
              footer: {
                icon_url: bot.user.avatarURL,
                text: "Bot created by Parker Smith"
              }
            }
          });
          });
        }).catch(err => {

        });

        if (message.guild.id == 354694491342372865) {

          bot.guilds.get("354694491342372865").fetchMembers().then(data => {
            bot.guilds.get("354694491342372865").fetchMember("107870014752718848")
            .then(member => {
              member.send({embed: {
                color: 3447003,
                author: {
                  name: bot.user.username,
                  icon_url: bot.user.avatarURL
                },
                title: "New Suggestion",
                url: "https://yeetdev.com",
                description: "A new suggestion was submitted.",
                fields: [{
                    name: "Suggestion",
                    value: arg1
                  },
                  {
                    name: "Author",
                    value: "<@" + message.author.id + ">"
                  },
                  {
                    name: "Discord Server",
                    value: message.guild.name + " (" + message.guild.id + ")"
                  }
                ],
                timestamp: new Date(),
                footer: {
                  icon_url: bot.user.avatarURL,
                  text: "Bot created by Parker Smith"
                }
              }
            });
            });
          }).catch(err => {

          });
      }


        message.reply("Sent your suggestion to Parker.");
    }
}

module.exports.help = {
  name:"suggest"
}
