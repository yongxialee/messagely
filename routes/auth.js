const Router = require("express").Router;
const router = new Router();
const ExpressError = require('../expressError')
const jwt = require('jsonwebtoken')
const User = require("../models/user");
const {SECRET_KEY}=require('../config');



/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post('/login', async (req,res,next)=>{
    try{
        const {username,password} = req.body;
        if(await User.authenticate(username,password)){
            let token = jwt.sign({username},SECRET_KEY);
            User.updateLoginTimestamp(username);
            return res.json({token})
        }else{
            throw new ExpressError("Invalid username/password",400)
        }
    }catch(e){
        next(e)
    }
})



/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
 router.post('/register', async (req, res, next) => {
    try {
      let {username} = await User.register(req.body);
      let token = jwt.sign({username}, SECRET_KEY);
      User.updateLoginTimestamp(username);
      return res.json({token});
    }
  
    catch (err) {
      return next(err);
    }
  });
  

module.exports = router;
