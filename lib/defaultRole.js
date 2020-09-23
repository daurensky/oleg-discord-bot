const config = require("config")

const defaultRole = async (member) => {
  const role = member.guild.roles.cache.find(
    (role) =>
      role.name.toLowerCase() === config.get("defaultRole").toLowerCase()
  )

  return member.roles.add(role)
}

module.exports = defaultRole
