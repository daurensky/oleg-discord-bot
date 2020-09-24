const { MessageEmbed } = require("discord.js")
const config = require("config")

const helpList = () => {
  const commands = (commandsArray) => {
    let result = []

    commandsArray.map((item) => {
      result.push(`\`\`-${item[0]}\`\` ${item[1]}`)
    })

    return result
  }

  const embed = new MessageEmbed()
    .setTitle(config.get("helpList.title"))
    .setColor("0x" + config.get("helpList.color"))
    .addFields(
      { name: "Команды", value: commands(config.get("helpList.commands")) },
      {
        name: "Фразы на которые бот ответит",
        value: config.get("helpList.phrases"),
      },
      {
        name: "Мои внутренности",
        value: "https://github.com/daurensky/oleg-discord-bot",
      }
    )
    .setImage("https://daurensky.ru/files/oleg_logo.png")

  return embed
}

module.exports = helpList
