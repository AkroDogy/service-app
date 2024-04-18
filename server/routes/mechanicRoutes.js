const express = require('express');
const router = express.Router();
const Car = require('../db/schemas/car_schema');

router.put('/dashboard/mechanic/:id', async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (car == null) {
            return res.status(404).json({ message: 'Cannot find car' });
        }
        if (req.body.status != null) {
            car.status = req.body.status;
        }
        if (req.body.inspectionDescription != null) {
            car.inspectionDescription = req.body.inspectionDescription;
        }
        const updatedCar = await car.save();
        res.json(updatedCar);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/dashboard/mechanic', async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;