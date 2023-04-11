const express = require('express')
const router= new express.Router();
const ExpressError = require('../expressError')
const jwt = require('jsonwebtoken')
const Message = require("../models/message");
const {SECRET_KEY}=require('../config');
const { ensureCorrectUser } = require('../middleware/auth');



/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get('/:id', ensureCorrectUser,async (req,res,next)=>{
    try{
        const message = await Message.get(req.body.id)
        return res.json({message})
    }catch(e){
        next(e)
    }
})

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post('/', ensureCorrectUser,async (req,res,next)=>{
    try{
        const {message} = await Message.create(re.body)
        return res.json({message})
    }catch(e){
        next(e)
    }
})

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/

router.post('/:id/read', ensureCorrectUser,async (req,res,next)=>{
    try{
        const {message} = await Message.markRead(req.body)
        return res.json({message})
    }catch(e){

    }
})
 module.exports = router;
