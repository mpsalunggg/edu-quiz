const User = require('../models/user.model')

const getUserById = async (id) => {
  try {
    const user = await User.findById(id)
    if (!user) {
      throw new Error('User not found.')
    }
    return { user }
  } catch (error) {
    throw new Error('Error retrieving user.')
  }
}

module.exports = { getUserById }
