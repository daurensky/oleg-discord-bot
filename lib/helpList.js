const { MessageEmbed } = require("discord.js")

const helpList = () => {
  const embed = new MessageEmbed()
    .setTitle("Я не 🤡, просто выполняю свою работу")
    .setColor(0xf1c40f)
    .addFields(
      { name: "Команды", value: "-roll, -flip" },
      { name: "Фразы", value: "Хорошая работа Олег" },
      {
        name: "Мои внутренности",
        value: "https://github.com/daurensky/oleg-discord-bot",
      }
    )
    .setImage("https://daurensky.ru/files/oleg_logo.png")

  return embed
}

module.exports = helpList
