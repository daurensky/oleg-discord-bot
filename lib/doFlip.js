const randomNumber = require("./randomNumber")

const doFlip = (message) => {
  const flip = randomNumber(1, 2) === 1 ? "ОРЕЛ" : "РЕШКА"

  return `${message.member.displayName} подбрасывает монетку: ***${flip}***`
}

module.exports = doFlip
