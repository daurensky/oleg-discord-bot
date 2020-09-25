const skipTrack = (msg, serverQueue) => {
  if (!serverQueue) return msg.channel.send("нечего пропускать")
  const args = msg.content.split(" ")
  const trackNumber = args[1] - 1

  const trackTitlesList = Array.from(serverQueue.songs, (song) => song.title)

  if (trackNumber) {
    msg.channel.send(`пропущена песня **${trackTitlesList[trackNumber]}**`)
    serverQueue.songs = serverQueue.songs.filter(
      (_, index) => index !== trackNumber
    )
  } else {
    msg.channel.send("пропущено")
    serverQueue.connection.dispatcher.end()
  }
}

module.exports = skipTrack
