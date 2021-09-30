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

    //Imalshi

    router.post('/get_UserData', function (req, res) {
        console.log(req.body)
        User.find(function (err, data) {
            if (!err) {
                var filtered = _.where(data, { Email: req.body.id });
                var TotalNumberOfUser = Object.keys(filtered).length;
                console.log(filtered)
                if (TotalNumberOfUser == 0) {
                    var data = {
                        Status: "Fail",
                        Message: "Invalid Email"
                    }
                    res.status(200).send(data);
                } else {
                    console.log(filtered)
                    var data = {
                        Status: "Sucess",
                        Message: "user Data Retrived",
                        data: filtered
                    }
                    res.status(200).send(data);
                }
            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    //Imalshi

    router.post('/updateUser', function (req, res) {
        try {
            User.updateOne({ Email: req.body.Email }, { Full_Name: req.body.Full_Name, Age: req.body.Age, Phone: req.body.Phone, Sex: req.body.sex }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Data Updated"
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
        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }
    })


   

    //Imlashi
    router.post('/AddRefund', function (req, res) {
        let RF = new Refund(req.body);
        RF.img="https://assets.website-files.com/5f50dfefde2d2df9368da112/5f6b1251e944e9c21ed2cdec_The-Digital-Business-Owner%E2%80%99s-Guide-To-Refunds_Mesa-de-trabajo-1.png"
        RF.save()
            .then(Refund => {
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