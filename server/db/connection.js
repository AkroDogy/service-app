const mongoose = require('mongoose');
require('dotenv').config();


module.exports = () => {
    try {
        mongoose.connect(process.env.DB_URI, {});
        console.log('>> SUCCESS: Connected to database!')
    } catch (error) {
        console.log(`>> ERROR: Could not connect to database (Error: ${error})`);
    } 
};