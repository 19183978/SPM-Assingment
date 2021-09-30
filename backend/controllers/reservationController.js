const express = require('express');
const router = express.Router();
var _ = require("underscore");
const bcrypt = require('bcrypt');
let Reservation = require('../models/reservation')

module.exports = function () {

     

    //Dulanji 

    router.get('/get_allReservations', function (req, res) {
       
        Reservation.find(function (err, data) {
           
            if (!err) {
                var data = {
                    Status: "Sucess",
                    Message: "Retrived All user Reservations",
                    data :data
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

    router.post('/RemoveReservation', function (req, res) {
        console.log("Test")
        try {
            Reservation.updateOne({ _id: req.body.id }, { User_Name: req.body.User_Name, Room_ID: req.body.Room_ID, From_Date: req.body.From_Date, To_Date: req.body.To_Date,Price:req.body.Price,Status:req.body.Status }, function (err, docs) {
                if (!err) {
                    console.log("Test2")
                    var data = {
                        Status: "Sucess",
                        Message: "Reservation Data Updated"
                    }
                    res.status(200).send(data);
                } else {
                    console.log("Test3")
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
    return router;
}