const Discord = require("discord.js");
const request = require("request");


module.exports.run = async (bot, message, args) => {
    if (args[1] != null) {
        if (args[2] == null) {

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

               message.reply("Fetching basic stats for " + args[1]);
               var url = 'https://api.hypixel.net/player?key=apikey&uuid=' + body2.id;
               request(url, function(err, response, body) {
                   if(err) {
                       console.log(err);
                       return message.reply('Error...');
                   }
                   var body = JSON.parse(body);
                   try {
                       var TESTFORURMUM = body.player.networkExp;
                   } catch(err) {
                       console.log(err);
                       message.reply("That player has never logged into hypixel.");
                       return;
                   }
                   var url = 'https://api.hypixel.net/friends?key=apikey&uuid=' + body2.id;
                   request(url, function(err, response, body3) {
                   if(err) {
                       console.log(err);
                       return message.reply('Error...');
                   }
                   var body3 = JSON.parse(body3);
                   var url = 'https://api.hypixel.net/session?key=apikey&uuid=' + body2.id;
                   request(url, function(err, response, body4) {
                   if(err) {
                       console.log(err);
                       return message.reply('Error...');
                   }
                   var body4 = JSON.parse(body4);
                   var rankgrab = body.player.newPackageRank;
                   var rank = "Default";
                   if (rankgrab == "VIP") {
                       rank = "VIP";
                   } else if (rankgrab == "VIP_PLUS") {
                       rank = "VIP+";
                   } else if (rankgrab == "MVP") {
                       rank = "MVP";
                   } else if (rankgrab == "MVP_PLUS") {
                       if (body.player.monthlyPackageRank == "SUPERSTAR") {
                           rank = "MVP++";
                       } else {
                           rank = "MVP+";
                       }
                       if (body.player.rank != null) {
                           if (body.player.rank == "YOUTUBER") {
                               rank = "Youtuber";
                           } else if (body.player.rank == "HELPER") {
                               rank = "Helper";
                           } else if (body.player.rank == "MODERATOR") {
                               rank = "Mod";
                           } else if (body.player.rank == "ADMIN") {
                               rank = "Admin";
                           } else if (body.player.rank == "OWNER") {
                               rank = "Owner";
                           }
                       }
                   }

                   var BASE = 10000;
                   var GROWTH = 2500;

                   var HALF_GROWTH = 0.5 * GROWTH;

                   var REVERSE_PQ_PREFIX = -(BASE - 0.5 * GROWTH) / GROWTH;
                   var REVERSE_CONST = REVERSE_PQ_PREFIX * REVERSE_PQ_PREFIX;
                   var GROWTH_DIVIDES_2 = 2 / GROWTH;

                   var level = Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * body.player.networkExp));

                   var status = "offline or not in a game.";
                   if (body4.session == null) {
                       status = "offline or not in a game.";
                   } else if (body4.session != null) {
                       status = "online in a game of " + body4.session.gameType;
                   }

                   function checkso(s) {
                       if (s == null) {
                           return "Not Set";
                       } else {
                           return s;
                       }
                   }

                   if (body.player.socialMedia != null) {
                       const embed = new Discord.RichEmbed()
                         .setTitle(body2.name + " is " + status)
                         .setURL("https://hypixel.net")
                         .setAuthor(body2.name + "'s hypixel stats", "https://crafatar.com/avatars/" + body2.name)
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
                         .addField("Rank", rank, true)
                         .addField("Network Level", level, true)
                         .addField("Achievement Points", "Coming Soon", true)
                         .addField("Friends", body3.records.length, true)
                         .addField("Twitter", checkso(body.player.socialMedia.links.TWITTER))
                         .addField("Youtube", checkso(body.player.socialMedia.links.YOUTUBE))
                         .addField("Instagram", checkso(body.player.socialMedia.links.INSTAGRAM))
                         .addField("Twitch", checkso(body.player.socialMedia.links.TWITCH))
                         .addField("Mixer", checkso(body.player.socialMedia.links.MIXER))
                         .addField("Discord", checkso(body.player.socialMedia.links.DISCORD))
                         .addField("Hypixel Forums", checkso(body.player.socialMedia.links.HYPIXEL))
                         /*
                          * Blank field, useful to create some space.
                          */

                     message.channel.send({embed});
                   } else {
                       const embed = new Discord.RichEmbed()
                     .setTitle(body2.name + " is " + status)
                     .setURL("https://hypixel.net")
                     .setAuthor(body2.name + "'s hypixel stats", "https://crafatar.com/avatars/" + body2.name)
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
                     .addField("Rank", rank, true)
                     .addField("Network Level", level, true)
                     .addField("Achievement Points", "Coming Soon", true)
                     .addField("Friends", body3.records.length, true)
                     /*
                      * Blank field, useful to create some space.
                      */

                     message.channel.send({embed});
                   }


               });
                       });
                                      });
               });
        } else {
            var game = args[1];
            var user = args[2];

            if (game.toLowerCase() != "skywars" && game.toLowerCase() != "bedwars") {
                message.reply("That is not a valid game! The current games are skywars and bedwars");
                return;
            }

            var url = 'https://api.mojang.com/users/profiles/minecraft/' + args[2];
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

               message.reply("Fetching " + game.toLowerCase() + " stats for " + args[2]);
               var url = 'https://api.hypixel.net/player?key=apikey&uuid=' + body2.id;
               request(url, function(err, response, body) {
                   if(err) {
                       console.log(err);
                       return message.reply('Error...');
                   }
                   var body = JSON.parse(body);
                   try {
                       var TESTFORURMUM = body.player.networkExp;
                   } catch(err) {
                       console.log(err);
                       message.reply("That player has never logged into hypixel.");
                       return;
                   }
                   var url = 'https://api.hypixel.net/friends?key=apikey&uuid=' + body2.id;
                   request(url, function(err, response, body3) {
                   if(err) {
                       console.log(err);
                       return message.reply('Error...');
                   }
                   var body3 = JSON.parse(body3);
                   var url = 'https://api.hypixel.net/session?key=apikey&uuid=' + body2.id;
                   request(url, function(err, response, body4) {
                   if(err) {
                       console.log(err);
                       return message.reply('Error...');
                   }
                   var body4 = JSON.parse(body4);
                   var rankgrab = body.player.newPackageRank;
                   var rank = "Default";
                   if (rankgrab == "VIP") {
                       rank = "VIP";
                   } else if (rankgrab == "VIP_PLUS") {
                       rank = "VIP+";
                   } else if (rankgrab == "MVP") {
                       rank = "MVP";
                   } else if (rankgrab == "MVP_PLUS") {
                       if (body.player.monthlyPackageRank == "SUPERSTAR") {
                           rank = "MVP++";
                       } else {
                           rank = "MVP+";
                       }
                       if (body.player.rank != null) {
                           if (body.player.rank == "YOUTUBER") {
                               rank = "Youtuber";
                           } else if (body.player.rank == "HELPER") {
                               rank = "Helper";
                           } else if (body.player.rank == "MODERATOR") {
                               rank = "Mod";
                           } else if (body.player.rank == "ADMIN") {
                               rank = "Admin";
                           } else if (body.player.rank == "OWNER") {
                               rank = "Owner";
                           }
                       }
                   }

                   var BASE = 10000;
                   var GROWTH = 2500;

                   var HALF_GROWTH = 0.5 * GROWTH;

                   var REVERSE_PQ_PREFIX = -(BASE - 0.5 * GROWTH) / GROWTH;
                   var REVERSE_CONST = REVERSE_PQ_PREFIX * REVERSE_PQ_PREFIX;
                   var GROWTH_DIVIDES_2 = 2 / GROWTH;

                   var level = Math.floor(1 + REVERSE_PQ_PREFIX + Math.sqrt(REVERSE_CONST + GROWTH_DIVIDES_2 * body.player.networkExp));

                   var status = "offline or not in a game.";
                   if (body4.session == null) {
                       status = "offline or not in a game.";
                   } else if (body4.session != null) {
                       status = "online in a game of " + body4.session.gameType;
                   }

                   if (game.toLowerCase() == "skywars") {

                       var krd = body.player.stats.SkyWars.kills / body.player.stats.SkyWars.deaths;


                       function check(s) {
                           if (s == null) {
                               return "0";
                           } else {
                               return s;
                           }
                       }

                       const embed = new Discord.RichEmbed()
                         .setTitle(body2.name + " is " + status)
                         .setURL("https://hypixel.net")
                         .setAuthor(body2.name + "'s skywars stats", "https://crafatar.com/avatars/" + body2.name)
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
                         .addField("Solo Wins", check(body.player.stats.SkyWars.wins_solo), true)
                         .addField("Solo Kills", check(body.player.stats.SkyWars.kills_solo), true)
                         .addField("Team Wins", check(body.player.stats.SkyWars.wins_team), true)
                         .addField("Team Kills", check(body.player.stats.SkyWars.kills_team), true)
                         .addField("Ranked Wins", check(body.player.stats.SkyWars.wins_ranked), true)
                         .addField("Ranked Kills", check(body.player.stats.SkyWars.kills_ranked), true)
                         .addField("Mega Wins", check(body.player.stats.SkyWars.wins_mega), true)
                         .addField("Mega Kills", check(body.player.stats.SkyWars.kills_mega), true)
                         .addField("Coins", check(body.player.stats.SkyWars.coins), true)
                         .addField("Souls", check(body.player.stats.SkyWars.souls), true)
                         .addField("KDR", parseFloat(body.player.stats.SkyWars.kills / body.player.stats.SkyWars.deaths).toFixed(2), true)
                         /*
                          * Blank field, useful to create some space.
                          */

                         message.channel.send({embed});
                   } else if (game.toLowerCase() == "bedwars") {

                       var krd = body.player.stats.kills / body.player.stats.deaths;


                       function check(s) {
                           if (s == null) {
                               return "0";
                           } else {
                               return s;
                           }
                       }

                       /**
                        * Calculate level for given bedwars experience
                        *
                        * @param $exp
                        * @return float|int
                        */
                       function getBedwarsLevel($exp) {
                           var BEDWARS_EXP_PER_PRESTIGE = 489000;
                           var BEDWARS_LEVELS_PER_PRESTIGE = 100;
                           var prestige = $exp / BEDWARS_EXP_PER_PRESTIGE;
                           var exp = $exp % BEDWARS_EXP_PER_PRESTIGE;
                           if (prestige > 5) {
                               var over = $prestige % 5;
                               var exp = $over * BEDWARS_EXP_PER_PRESTIGE;
                               var prestige = $over;
                           }
                           // first few levels are different
                           if ($exp < 500) {
                               return 0 + (prestige * BEDWARS_LEVELS_PER_PRESTIGE);
                           } else if ($exp < 1500) {
                               return 1 + (prestige * BEDWARS_LEVELS_PER_PRESTIGE);
                           } else if ($exp < 3500) {
                               return 2 + (prestige * BEDWARS_LEVELS_PER_PRESTIGE);
                           } else if ($exp < 5500) {
                               return 3 + (prestige * BEDWARS_LEVELS_PER_PRESTIGE);
                           } else if ($exp < 9000) {
                               return 4 + (prestige * BEDWARS_LEVELS_PER_PRESTIGE);
                           }
                           $exp -= 9000;
                           return ($exp / 5000 + 4) + (prestige * BEDWARS_LEVELS_PER_PRESTIGE);
                       }

                       const embed = new Discord.RichEmbed()
                         .setTitle(body2.name + " is " + status)
                         .setURL("https://hypixel.net")
                         .setAuthor(body2.name + "'s bedwars stats", "https://crafatar.com/avatars/" + body2.name)
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
                         .addField("Wins", check(body.player.stats.Bedwars.wins_bedwars), true)
                         .addField("Solo Kills", check(body.player.stats.Bedwars.eight_one_kills_bedwars), true)
                         .addField("Solo Deaths", check(body.player.stats.Bedwars.eight_one_deaths_bedwars), true)
                         .addField("Solo Wins", check(body.player.stats.Bedwars.eight_one_wins_bedwars), true)
                         .addField("Solo Final Kills", check(body.player.stats.Bedwars.eight_one_final_kills_bedwars), true)
                         .addField("2v2v2v2 Kills", check(body.player.stats.Bedwars.eight_two_kills_bedwars), true)
                         .addField("2v2v2v2 Deaths", check(body.player.stats.Bedwars.eight_two_deaths_bedwars), true)
                         .addField("2v2v2v2 Wins", check(body.player.stats.Bedwars.eight_two_wins_bedwars), true)
                         .addField("2v2v2v2 Final Kills", check(body.player.stats.Bedwars.eight_two_final_kills_bedwars), true)
                         .addField("3v3v3v3 Kills", check(body.player.stats.Bedwars.four_three_kills_bedwars), true)
                         .addField("3v3v3v3 Deaths", check(body.player.stats.Bedwars.four_three_deaths_bedwars), true)
                         .addField("3v3v3v3 Wins", check(body.player.stats.Bedwars.four_three_wins_bedwars), true)
                         .addField("3v3v3v3 Final Kills", check(body.player.stats.Bedwars.four_three_final_kills_bedwars), true)
                         .addField("4v4v4v4 Kills", check(body.player.stats.Bedwars.four_four_kills_bedwars), true)
                         .addField("4v4v4v4 Deaths", check(body.player.stats.Bedwars.four_four_deaths_bedwars), true)
                         .addField("4v4v4v4 Wins", check(body.player.stats.Bedwars.four_four_wins_bedwars), true)
                         .addField("4v4v4v4 Final Kills", check(body.player.stats.Bedwars.four_four_final_kills_bedwars), true)
                         .addField("Coins", check(body.player.stats.Bedwars.coins), true)
                         .addField("BW Level", getBedwarsLevel(check(body.player.stats.Bedwars.exp)), true)


                         .addField("KDR", parseFloat(body.player.stats.Bedwars.kills_bedwars / body.player.stats.Bedwars.deaths_bedwars).toFixed(2), true)
                         /*
                          * Blank field, useful to create some space.
                          */

                         message.channel.send({embed});
                   } else {
                       message.reply("That is an invalid game! The valid games are skywars and bedwars")
                   }
               });
                       });
                                      });
               });
        }
   } else {
       message.reply("Please use !player (Game) (Player) or !player (Player)");
   }
}

module.exports.help = {
  name:"player"
}
