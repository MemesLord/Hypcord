const Discord = require('discord.js');
const TOKEN = "lolurtrashthoughtiwouldleakmytoken";
const PREFIX = ":";

var members = [];

var msgs = [
    "Hello everyone! I'm an innocent who loves everything Hypixel.",
    "Your personality shines brighter than the sun.",
    "I had something to say, then I forgot it.",
    "Your Clicks per second are godly. :eek:",
    "Why can't Ender Dragon read a book? Because he always starts at the End.",
    "In my free time I like to watch cat videos on youtube",
    "Wait... This isn't what I typed!",
    "I like Minecraft pvp but you are truly better than me!",
    "I like pineapple on my pizza",
    "Blue is greener than purple for sure",
    "Let's be friends instead of fighting okay?",
    "Sometimes I sing soppy love songs in the car.",
    "I like to eat pasta, do you prefer nachos?",
    "I love the way your hair glistens in the light",
    "ILY<3",
    "You are very good at this game friend.",
    "When nothing is going right, go left.",
    "Anybody else really like Rick Astley?",
    "If the world in Minecraft is infinite....how can the sun revolve around it?",
    "I sometimes try to say bad things and then this happens :(",
    "I heard you like minecraft, so I built a computer so you can minecraft, while minecrafting in your minecraft.",
    "What happens if I add chocolate milk to macaroni and cheese?",
    "You're a great person! Do you want to play some Hypixel games with me?",
    "Pls give me doggo memes!",
    "I enjoy long walks on the beach and playing Hypixel",
    "I have really enjoyed playing with you! <3",
    "Please go easy on me, this is my first game!",
    "Doin a bamboozle fren.",
    "Behold, the great and powerful, my magnificent and almighty nemisis!",
    "When I saw the guy with a potion I knew there was trouble brewing.",
    "Maybe we can have a rematch?",
    "Can you paint with all the colors of the wind",
    "I need help, teach me how to play!",
    "Hey Helper, how play game?"
];


var bot = new Discord.Client();

var last = "0";

function pick() {
    return msgs[Math.floor(Math.random() * msgs.length)];
}

function random() {
    if (pick() == last) {
        random();
    } else if (pick() == "undefined") {
        random();
    } else {
        last = pick();
        return pick();
    }
}

bot.on("ready", function() {
    console.log("Bot Started");
    bot.user.setPresence({ game: { name: "Your game", type: 0 } });
});

bot.on("message", function(message) {

    if (message.author.equals(bot.user)) return;
    
    var args = message.content.split(" ");

    if (args[0].toLowerCase() == "ez" || args[0].toLowerCase() == "ezz" || args[0].toLowerCase() == "ezzz" || args[0].toLowerCase() == "ezzzz" || args[0].toLowerCase() == "ezzzzz" || args[0].toLowerCase() == "ezzzzzz") {
        if (members.includes(message.author.id)) {
            message.delete();
            message.author.sendMessage("You are on a 10 second cooldown for the ez message response.");
        } else {
            message.delete();
            message.channel.send({embed: {
              color: 3447003,
              description: message.author + " meant to say '" + random() + "'"
            }});
            members.push(message.author.id);
            setTimeout(function(){
                var pos = members.indexOf(message.author.id);
                members.splice(pos, 1);
            },10000 /* 10 seconds */);
        }
        return;
    } 
   
});


bot.login(TOKEN);
