const config = require("config")

class TextCommand {
  constructor(msg) {
    this.msg = msg
    this.sign = config.get("sign")
    this.msgClear = msg.content.toLowerCase()
    this.voiceChannel = msg.member.voice.channel
    this.isBot = msg.member.id === config.get("bot_id")
  }

  command(name) {
    // return this.msgClear === this.sign + name
    return this.msg.content.startsWith(this.sign + name)
  }

  message(text) {
    return this.msgClear === text
  }

  test(text) {
    return this.msgClear === `test.${text}`
  }

  inMessage(text) {
    return this.msgClear.search(new RegExp(text.toLowerCase())) !== -1
  }

  async voiceCommand(name, callback) {
    if (this.command(name)) {
      if (this.voiceChannel) {
        await callback()
      } else {
        this.msg.channel.send("ты должен быть в канале")
      }
    }
  }
}

module.exports = TextCommand
