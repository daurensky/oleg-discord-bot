const Discord = require("discord.js")
const config = require("config")
const token = require("./token")

const createWelcomeMessage = require("./lib/welcomeMessage")
const addDefaultRole = require("./lib/defaultRole")
const doRoll = require("./lib/doRoll")
const doFlip = require("./lib/doFlip")
const helpList = require("./lib/helpList")
const TextCommand = require("./lib/textCommand")
const play = require("./lib/playMusic")
const tracklist = require("./lib/tracklist")
const skipTrack = require("./lib/skipTrack")

const client = new Discord.Client()
const queue = new Map()

client.login(token)

client.on("ready", () => {
  client.user.setActivity("Dota 3", {
    type: "PLAYING",
  })
})

client.on("guildMemberAdd", async (member) => {
  addDefaultRole(member)

  createWelcomeMessage(member, config.get("mainChannel").toLowerCase())
})

// COMMON MESSAGES
client.on("message", (msg) => {
  const sended = new TextCommand(msg)

  if (sended.message("хорошая работа олег")) {
    msg.channel.send("<:ez:744200683363893398>")
  }

  if (sended.inMessage("назым кто")) {
    msg.channel.send("Назым чорт")
  }

  if (sended.inMessage("даурен гений")) {
    msg.channel.send("<:DaurenGenius:758540102443728897>")
  }

  if (sended.message("пошел нахуй расул")) {
    msg.channel.send("дада пошел нахуй")
  }
})

// COMMANDS
client.on("message", async (msg) => {
  const sended = new TextCommand(msg)

  if (sended.isBot) return

  const serverQueue = queue.get(msg.guild.id)

  // roll
  if (sended.inMessage(sended.sign + "roll")) {
    msg.channel.send(doRoll(msg))
  }

  // flip
  if (sended.command("flip")) {
    msg.channel.send(doFlip(msg))
  }

  // help
  if (sended.command("help")) {
    msg.channel.send(helpList())
  }

  // join
  sended.voiceCommand("join", () => {
    msg.channel.send("запрыгиваю в канал")
    sended.voiceChannel.join()
  })

  // play
  sended.voiceCommand("play", () => {
    play(msg, sended.voiceChannel, queue)
  })

  // pause
  sended.voiceCommand("pause", () => {
    msg.channel.send("песня приостановлена")
    serverQueue.connection.dispatcher.pause()
  })

  // volume
  sended.voiceCommand("volume", () => {
    const volume = msg.content.split(" ")[1]

    msg.channel.send(`громкость изменена на ${volume}`)
    serverQueue.connection.dispatcher.setVolume(volume)
  })

  // resume
  sended.voiceCommand("resume", () => {
    msg.channel.send("песня возобновлена")
    serverQueue.connection.dispatcher.resume()
  })

  // skip
  sended.voiceCommand("skip", () => {
    skipTrack(msg, serverQueue)
  })

  // tracklist
  sended.voiceCommand("tracklist", () => {
    tracklist(msg, serverQueue)
  })

  // stop
  sended.voiceCommand("stop", () => {
    msg.channel.send("остановлено")
    serverQueue.songs = []
    serverQueue.connection.dispatcher.end()
  })

  // leave
  sended.voiceCommand("leave", () => {
    msg.channel.send("выпрыгиваю из канала")
    sended.voiceChannel.leave()
  })
})

// TEST MESSAGES (need to check action functions)
client.on("message", async (msg) => {
  const sended = new TextCommand(msg)

  if (sended.test("hello")) {
    createWelcomeMessage(msg.member, config.get("testChannel").toLowerCase())
  }

  if (sended.test("addrole")) {
    addDefaultRole(msg.member)
      .then(() => {
        msg.channel.send("стандартная роль добавляется")
      })
      .catch(() => {
        msg.channel.send("неверное название роли в конфиге")
      })
  }
})
