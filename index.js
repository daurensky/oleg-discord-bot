const Discord = require("discord.js")
const config = require("config")
const token = require("./token")

const createWelcomeMessage = require("./lib/welcomeMessage")
const addDefaultRole = require("./lib/defaultRole")
const doRoll = require("./lib/doRoll")
const doFlip = require("./lib/doFlip")
const helpList = require("./lib/helpList")

const client = new Discord.Client()

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
  const message = (text) => msg.content.toLowerCase() === text

  if (message(`пошел нахуй расул`)) {
    msg.channel.send("да, пошел нахуй")
  }

  if (message(`хорошая работа олег`)) {
    msg.channel.send("<:ez:744200683363893398>")
  }
})

// COMMANDS
client.on("message", (msg) => {
  const msgClear = msg.content.toLowerCase()
  const sign = config.get("sign")
  const command = (name) => msgClear === sign + name
  const isRollCommand = msgClear.search(new RegExp(`${sign}roll`)) !== -1

  if (msg.member.id !== config.get("bot_id")) {
    // roll
    if (isRollCommand) {
      msg.channel.send(doRoll(msg))
    }

    // flip
    if (command`flip`) {
      msg.channel.send(doFlip(msg))
    }

    // help
    if (command`help`) {
      msg.channel.send(helpList())
    }
  }
})

// TEST MESSAGES (need to check action functions)
client.on("message", async (msg) => {
  const message = (text) => msg.content.toLowerCase() === text

  if (message`test.hello`) {
    createWelcomeMessage(msg.member, config.get("testChannel").toLowerCase())
  }

  if (message`test.addrole`) {
    addDefaultRole(msg.member)
      .then(() => {
        message.channel.send("стандартная роль добавляется")
      })
      .catch(() => {
        message.channel.send("неверное название роли в конфиге")
      })
  }
})
