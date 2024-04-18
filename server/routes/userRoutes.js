const express = require('express');
const router = express.Router();
const User = require('../db/schemas/auth_schema');

router.put('/dashboard/admin/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }
        if (req.body.rank != null) {
            user.rank = req.body.rank;
        }
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete('/dashboard/admin/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user == null) {
            return res.status(404).json({ message: 'Cannot find user' });
        }

        res.json({ message: 'User has been deleted' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

router.get("/dashboard/admin/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });  
    }
})

module.exports = router;