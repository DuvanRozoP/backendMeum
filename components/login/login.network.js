const express = require('express');
const router = express.Router();
const response = require('../../network/response');
const controller = require('./login.controller')

router.get('/', (req, res) => {
    const filterUser = req.query.password || null;
    controller.getUser(filterUser)
        .then( data => { response.success(req,res,201,data) })
        .catch(error => { response.error(req,res,401,error) })
})

router.post('/', (req, res) => {
    controller.addUser(
        req.body.user,
        req.body.password
    )
    .then( data => { response.success(req,res,201,data) })
    .catch(error => { response.error(req,res,401,error) })
})

module.exports = router