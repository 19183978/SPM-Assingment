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


    //Pawani
    router.post('/add_user', function (req, res) {
        let UserData = new User(req.body);
        User.find(function (err, data) {
            if (!err) {
                var filtered = _.where(data, { Email: req.body.Email });
                var TotalNumberOfUser = Object.keys(filtered).length;

                if (TotalNumberOfUser > 0) {
                    var data = {
                        Status: "Email",
                        Message: "Email Already Exists In The Database"
                    }
                    res.status(200).send(data);
                } else {
                    bcrypt.hash(req.body.Password, saltRounds, function (err, hash) {
                        UserData.Password = hash
                        UserData.save()
                            .then(User => {
                                var data = {
                                    Status: "Sucess",
                                    Message: "User Created Sucessfully"
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
                }
            } else {
                var data = {
                    Status: "Faiil",
                    Message: "Unexpected Error PLease Contact System Admin"
                }
                res.status(200).send(data);
            }
        })
    })

    //Pawani
    router.post('/login', function (req, res) {
        User.find({ Email: req.body.Email }, function (err, data) {
            if (!err) {
                var filtered = _.where(data, { Email: req.body.Email });
                var TotalNumberOfUser = Object.keys(filtered).length;
                if (TotalNumberOfUser == 0) {
                    var data = {
                        Status: "Fail",
                        Message: "Invalid Email"
                    }
                    res.status(200).send(data);
                } else {
                    hash = filtered[0].Password
                    password = req.body.Password

                    bcrypt.compare(password, hash, function (err, result) {
                        console.log(req.body.Password)

                        if (result == true) {
                            var data = {
                                Status: "Sucess",
                                Message: "Login Sucessfull"
                            }
                            res.status(200).send(data);

                        } else {
                            var data = {
                                Status: "Fail",
                                Message: "Invalid Credentails"
                            }
                            res.status(200).send(data);
                        }
                    });

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

   


    //pawani

    router.get('/get_all_actiities', function (req, res) {

        Activity.find(function (err, dataX) {

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

    //Pawani


    router.post('/AddFeedBack', function (req, res) {
        let FC = new FeedBack(req.body);
        FC.img="https://cdn.pixabay.com/photo/2020/01/07/05/42/feedback-4746811_960_720.png"
        FC.save()
            .then(FeedBack => {
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