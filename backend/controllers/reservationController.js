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
    return router;
}