const express = require('express');
const router = express.Router();
var _ = require("underscore");
const bcrypt = require('bcrypt');
let User = require('../models/user')
let Activity = require('../models/activities')
let FeedBack = require('../models/feedback')
let Refund = require('../models/refund')
let Payment = require('../models/payment')
const saltRounds = 10;
module.exports = function () {


    //Dulanji

    router.get('/get_all_Users', function (req, res) {
        console.log(req.body)
        User.find(function (err, data) {
            if (!err) {



                var data = {
                    Status: "Sucess",
                    Message: "user Data Retrived",
                    data: data
                }
                res.status(200).send(data);

            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })


    

    //Dulanji
    router.post('/MakePayment', function (req, res) {
        let RF = new Payment(req.body);
        RF.img="https://nmgprod.s3.amazonaws.com/media/files/a9/cf/a9cfd21d1973a93b6b366afa65efad9f/cover_image.jpg.760x400_q85_crop_upscale.jpg"
        RF.save()
            .then(Payment => {
                var data = {
                    Status: "Sucess",
                    Message: "Activity Created Sucessfully"
                }
                res.status(201).send(data);
            }).catch(err => {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            });

    })

    return router;
}