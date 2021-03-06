const AppointmentModel = require('../models/appointment');
const UserModel = require('../models/user');
const moment = require('moment');


const AppointmentController = {
    async addOne(req, res) {
         let user = await UserModel.findOne({
            email: req.params.email
        });

        if (!user.token) {
            res.status(400).send({
                message: 'You must be registered and logged in'
            });

        }else{ 
        try {
            const appointment = await AppointmentModel({
                date: req.body.date,
                email_user: user.email,
                observations: req.body.observations,
                token_user: user.token
            }).save();
            res.status(201).send({
                appointment
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                error,
                message: 'An error occurred while trying to create your appointment'
            })
        }}
    },
    async deleteOne(req, res) {
        try {
            const appointment = await AppointmentModel.findByIdAndDelete({
                _id: req.params._id
            })
            res.send({
                message: 'Your appointment has been successfully deleted',
                appointment
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'An error occurred while trying to delete your appointment'
            })
            
        }
    },

    async getAll(req, res) {
        try {
            const appointment = await AppointmentModel.find({
                token_user: req.params.token_user
            })
            res.status(201).send({
                appointment
            })
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'An error occurred while trying to display your appointments'
            })
            
        }
    }

}

module.exports = AppointmentController;