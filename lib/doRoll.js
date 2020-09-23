const randomNumber = require("./randomNumber")

const doRoll = (message) => {
  const wordsArray = message.content.toLowerCase().split(" ")
  const value = wordsArray.length === 1 ? "100" : wordsArray[1]

  if (value < 1 || value % 1 !== 0) {
    return message.channel.send("некорректное число")
  }

  let randomValue = randomNumber(1, value).toString()

  while (randomValue.length < value.length) {
    randomValue = "0" + randomValue
  }

  return `${message.member.displayName} получает случайное число (1-${value}): \`${randomValue}\``
}

module.exports = doRoll
