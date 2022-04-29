const Users = require('../users/user-model')

async function checkUsernameInUse(req, res, next) {
    try{
      const checkUser = await Users.findBy({username: req.body.username})
      if(checkUser.length){
        next({status:422, message: "Username taken"})
      }else{
        next()
      }
    }catch(err){
      next(err)
    }
  }
  
  async function checkUsernameExists(req, res, next) {
    try{
        const [user] = await Users.findBy({username: req.body.username})
        req.user = user
        if(user){
            next()
        }else{
            next({status: 401, message: "Invalid credentials"})
        }
    }catch(err){
      next(err)
    }
  }
  
  function checkName_Password(req, res, next) {
    if(!req.body.username || !req.body.password)
    next({status: 422, message: "username and password required"})
    else{
      next()
    }
  }

  module.exports = {
    checkUsernameInUse,
    checkUsernameExists,
    checkName_Password
  }