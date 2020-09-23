const Discord = require("discord.js")
const config = require("config")
const token = require("./token")

const createWelcomeMessage = require("./lib/welcomeMessage")
const addDefaultRole = require("./lib/defaultRole")

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
client.on("message", (message) => {
  const msg = message.content.toLowerCase()

  if (msg === "хорошая работа олег") {
    message.channel.send("<:ez:744200683363893398>")
  }
})

// TEST MESSAGES
client.on("message", async (message) => {
  const msg = message.content.toLowerCase()
  const member = message.member

  if (msg === "test.hello") {
    createWelcomeMessage(member, config.get("testChannel").toLowerCase())
  }

  if (msg === "test.addrole") {
    addDefaultRole(member)
      .then(() => {
        message.channel.send("стандартная роль добавляется")
      })
      .catch(() => {
        message.channel.send("неверное название роли в конфиге")
      })
  }
})
