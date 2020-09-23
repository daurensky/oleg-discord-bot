const createText = (canvas, text, { x, y, fontSize, align }) => {
  const strokeColor = "#3d3c43"
  const textColor = "#ffffff"

  const ctx = canvas.getContext("2d")

  if (fontSize) ctx.font = `${fontSize}px "Open Sans"`
  if (align) ctx.textAlign = align

  ctx.strokeStyle = strokeColor
  ctx.lineWidth = 7
  ctx.strokeText(text, x, y)
  ctx.fillStyle = textColor
  ctx.fillText(text, x, y)
}

module.exports = createText
