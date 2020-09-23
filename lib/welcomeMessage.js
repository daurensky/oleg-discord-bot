const Discord = require("discord.js")
const { createCanvas, registerFont, loadImage } = require("canvas")

const normalizeTextWidth = require("./normalizeWidth")
const createText = require("./createText")

const welcomeMessage = async (member, channelName) => {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name.toLowerCase() === channelName
  )
  if (!channel) return

  // Register font. FONT MUST BE PLACED BEFORE CANVAS INITIALIZATION
  registerFont("./assets/fonts/OpenSans-Bold.ttf", {
    family: "Open Sans",
  })
  const canvas = createCanvas(700, 250)
  const ctx = canvas.getContext("2d")

  // Add bg
  const background = await loadImage("./assets/img/hypersonic_bg.jpg")
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height)

  // Add welcome message
  createText(canvas, "Добро\nпожаловать", {
    x: 183,
    y: 80,
    fontSize: 31.5,
  })

  // Add member nickname
  ctx.font = normalizeTextWidth(canvas, `${member.displayName}`)
  createText(canvas, `${member.displayName}`, {
    x: 230,
    y: 210,
    align: "center",
  })

  // Add user avatar mask
  ctx.beginPath()
  ctx.arc(96.5, 96.5, 66.5, 0, Math.PI * 2, true)
  ctx.closePath()
  ctx.clip()

  // Add user avatar
  const avatar = await loadImage(
    member.user.displayAvatarURL({ format: "jpg" })
  )
  ctx.drawImage(avatar, 30, 30, 133, 133)

  // Create attachment
  const attachment = new Discord.MessageAttachment(
    canvas.toBuffer(),
    "welcome-image.png"
  )

  channel.send(`Ебать, да это же ${member.displayName}!`, attachment)

  return true
}

module.exports = welcomeMessage
