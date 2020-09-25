const { MessageEmbed } = require("discord.js")

const tracklist = (msg, serverQueue) => {
  if (!serverQueue) {
    msg.channel.send("трек лист пуст")
  }

  const trackTitlesList = Array.from(
    serverQueue.songs,
    (song, index) => `${index + 1}. ${song.title}`
  )

  const embed = new MessageEmbed()
    .setTitle("Текущий трек лист")
    .setDescription(trackTitlesList)

  msg.channel.send(embed)
}

module.exports = tracklist
