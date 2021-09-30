const express = require('express');
const router = express.Router();
var _ = require("underscore");
const bcrypt = require('bcrypt');
let Manager = require('../models/manager')
let Hotel = require('../models/hotel')
let User = require('../models/user')
let Activity = require('../models/activities')
let FeedBack = require('../models/feedback')
let Refund = require('../models/refund')
let Payment = require('../models/payment')
const saltRounds = 10;
module.exports = function () {

   

    //Pawani
    router.post('/add_activity', function (req, res) {
        let ac = new Activity(req.body);
        ac.img="http://ses.ssd6.org/files/2017/12/activities.jpg"
        ac.save()
            .then(Activity => {
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

    //Pawani
    router.post('/getActivityByID', function (req, res) {
        console.log(req.body)
        Activity.find(function (err, dataX) {

            if (!err) {
                var filtered = _.where(dataX, { ActivityName: req.body.id });
                console.log("HU", filtered)
                var data = {
                    Status: "Sucess",
                    Message: "Retrived All Room Data",
                    data: filtered
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

    //pawani 
    router.post('/RemoveActivity', function (req, res) {
        console.log(req.body, "here")
        try {
            Activity.findByIdAndRemove({ _id: req.body.id }, function (err, todo) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "User Deleted"
                    }
                    res.status(200).send(data);
                } else {
                    var data = {
                        Status: "Fail",
                        Message: "Unexpected Error PLease Contact System Admin"
                    }
                    res.status(200).send(data);
                }
            });

        } catch {
            var data = {
                Status: "Fail",
                Message: "Unexpected Error PLease Contact System Admin"
            }
            res.status(200).send(data);

        }

    })
    //pawani
    router.get('/getAllFeedBack', function (req, res) {

        FeedBack.find(function (err, dataX) {

            if (!err) {
                var data = {
                    Status: "Sucess",
                    Message: "Retrived All Activitues",
                    data: dataX
                }
                res.status(200).send(dataX);
            } else {
                var data = {
                    Status: "Fail",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })
    




    return router;
}