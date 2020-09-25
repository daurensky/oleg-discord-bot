const ytdl = require("ytdl-core")
const simpleYT = require("simpleyt")

const playMusic = async (msg, voiceChannel, queue) => {
  const args = msg.content.split(" ")
  args.shift()

  if (args.length === 0) return msg.channel.send("укажи песню пжлст")

  const trackName = args.join(" ")

  try {
    const result = await simpleYT(trackName)

    if (result.length === 0)
      return msg.channel.send(
        `ничего похожего по запросу **${trackName}** не найдено`
      )

    const video = result[0]

    msg.channel.send(`поиск песни **${trackName}**`)

    const serverQueue = queue.get(msg.guild.id)

    const songInfo = await ytdl.getInfo(video.uri)
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    }

    if (!serverQueue) {
      const queueConstruct = {
        textChannel: msg.channel,
        voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      }

      queue.set(msg.guild.id, queueConstruct)

      queueConstruct.songs.push(song)

      try {
        const connection = await voiceChannel.join()
        queueConstruct.connection = connection
        playFromYoutube(msg.guild, queueConstruct.songs[0], queue)
      } catch (e) {
        console.log(e)
        queue.delete(msg.guild.id)
        return msg.channel.send(e)
      }
    } else {
      serverQueue.songs.push(song)
      return msg.channel.send(`**${song.title}** добавлена в очередь`)
    }
  } catch (e) {
    console.log(e)
  }
}

const playFromYoutube = (guild, song, queue) => {
  const serverQueue = queue.get(guild.id)

  if (!song) {
    queue.delete(guild.id)
    return
  }

  const dispatcher = serverQueue.connection.play(ytdl(song.url))

  dispatcher.on("finish", () => {
    serverQueue.songs.shift()
    playFromYoutube(guild, serverQueue.songs[0], queue)
  })

  dispatcher.on("error", console.error)

  dispatcher.setVolume(serverQueue.volume / 5)

  serverQueue.textChannel.send(`включаю **${song.title}**`)
}

module.exports = playMusic
