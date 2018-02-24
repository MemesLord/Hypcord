const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var msgid = args[2];
    message.delete();
    var channel = message.mentions.channels.first();
    channel.fetchMessage(msgid).then(msg => msg.delete()).catch(err=> console.log(err))
}

module.exports.help = {
  name:"delete"
}
