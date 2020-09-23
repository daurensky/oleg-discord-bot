const normalizeTextWidth = (canvas, text) => {
  const ctx = canvas.getContext("2d")

  let fontSize = 37.5

  do {
    ctx.font = `${(fontSize -= 5)}px "Open Sans"`
  } while (ctx.measureText(text).width > canvas.width - 200)

  return ctx.font
}

module.exports = normalizeTextWidth
