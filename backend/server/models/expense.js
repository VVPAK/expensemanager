const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var Expense = new Schema({
    userId: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    name: {
        type: String,
        required: true
    },
    cost: {
        type: String,
        required: true
    } 
});

var ExpenseModel = mongoose.model('Expense', Expense);

module.exports = ExpenseModel;