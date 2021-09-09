const express = require('express');
const router = express.Router();
var _ = require("underscore");
const bcrypt = require('bcrypt');
let Reservation = require('../models/reservation')

module.exports = function () {

     //Pawani
    router.post('/make_reservation', function (req, res) {
        let ReservationData = new Reservation(req.body);
        ReservationData.save()
            .then(Reservation => {
                var data = {
                    Status: "Sucess",
                    Message: "Reservation Created Sucessfully"
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
    router.post('/RemoveUserReservation', function (req, res) {
        try {
            console.log(req.body)
            Reservation.findByIdAndRemove({ _id: req.body.id }, function (err, todo) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "Reservation Deleted"
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


    //Pawani
    router.put('/updateReservation', function (req, res) {
        try {
            Reservation.updateOne({ _id: req.body.id }, { User_Name: req.body.User_Name, Room_ID: req.body.Room_ID, From_Date: req.body.From_Date, To_Date: req.body.To_Date,Price:req.body.Price,Status:req.body.Status }, function (err, docs) {
                if (!err) {
                    var data = {
                        Status: "Sucess",
                        Message: "Reservation Data Updated"
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

    //Pawani

    router.post('/get_all_Reservations_byUserID', function (req, res) {
       console.log(req.body)
        Reservation.find(function (err, data) {
            var filtered = _.where(data, { User_Name: req.body.User_Name });
            if (!err) {
                var data = {
                    Status: "Sucess",
                    Message: "Retrived All user Reservations",
                    data :filtered
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


    
    return router;
}