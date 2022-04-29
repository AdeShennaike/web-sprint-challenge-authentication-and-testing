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
  
  async function checkUsernameExists_passwordValid(req, res, next) {
    try{
      const [checkUser] = await Users.findBy({username: req.body.username})
      if(checkUser || checkUser.password === req.body.password){
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
    checkUsernameExists_passwordValid,
    checkName_Password
  }