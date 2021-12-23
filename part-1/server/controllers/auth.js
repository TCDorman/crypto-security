const users = []

const bcryptjs = require('bcryptjs')

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          let authenticated = bcryptjs.compareSync(password, users[i].passwordHash)
          if (authenticated) {
              let userToReturn = {...users[i]}
              delete userToReturn.passwordHash
              res.status(200).send(userToReturn)
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        const {
          username,
          email,
          firstName,
          lastName,
          password } = req.body
          const salt = bcryptjs.genSaltSync(5)
          const passwordHash = bcryptjs.hashSync(password, salt)
          console.log(passwordHash)
          const userObj = {username, email, firstName,
            lastName, passwordHash}
            users.push(userObj)
            let userToReturn = {...userObj}
            delete userToReturn.passwordHash
        res.status(200).send(userToReturn)
    }
}