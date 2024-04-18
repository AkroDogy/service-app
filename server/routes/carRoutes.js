const express = require("express");
const router = express.Router();
const Car = require("../db/schemas/car_schema");
const User = require("../db/schemas/auth_schema");

router.get("/dashboard/cars/:id", async (req, res) => {
    try {
        const user = await User.findOne({ googleId: req.params.id });
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        const cars = await Car.find({ email: user.email });
        if (cars.length === 0) {
            return res.status(404).json({ message: 'Cannot find cars for this user' });
        }
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
})

router.post('/dashboard/appointment', async (req, res) => {
    try {
        const car = new Car(req.body)
        await car.save()
        res.status(201).send({ message: 'Car data saved successfully' })
    } catch (error) {
        res.status(400).send({ message: error.message })
        console.log(error.message)
    }
  });

  router.put('/dashboard/cars/:id', async (req, res) => {
    try {
      const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedCar);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  router.delete('/dashboard/cars/:id', async (req, res) => {
    try {
      const removedCar = await Car.findByIdAndDelete(req.params.id);
      res.json(removedCar);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;