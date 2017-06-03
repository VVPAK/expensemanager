const express = require('express');
const router = express.Router();
const log = require('../libs/log')(module);
const passport = require('passport');

var ExpenseModel = require('../models/expense');

router.get('/', passport.authenticate('bearer', { session: false }), (req, res) => {
    let userId = req.user.userId;
    return ExpenseModel.find({ userId: userId }, (err, expenses) => {
        if (!err) {
            res.send(expenses);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    });
});

router.get('/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    let userId = req.user.userId;
    ExpenseModel.findById(req.params.id, (err, expense) => {
        if (!err) {
            log.info(`User with id ${expense.userId} trying to get expense with id ${req.params.id}`);

            if (expense.userId == userId) {
                res.send(expense);
            } else {
                res.statusCode = 401;
                return res.send({ error: 'AccessDenied' });
            }
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s',res.statusCode,err.message);
            return res.send({ error: 'Server error' });
        }
    })
});

router.post('/', passport.authenticate('bearer', { session: false }), (req, res) => {
    var expense = new ExpenseModel({
        userId: req.user.userId,
        name: req.body.name,
        cost: req.body.cost
    });

    expense.save((err) => {
        if (!err) {
            //log.info("article created");
            return res.send({ status: 'OK', expense:expense });
        } else {
            log.error(err);
            if(err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({ error: 'Validation error' });
            } else {
                res.statusCode = 500;
                res.send({ error: 'Server error' });
            }
            log.error('Internal error(%d): %s',res.statusCode,err.message);
        }
    });
});

router.put('/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    return ExpenseModel.findById(req.params.id, function (err, expense) {
        if(!expense) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        } else {
            if (expense.userId != req.user.userId) {
                res.statusCode = 401;
                return res.send({ error: 'Access denied' })
            }
        }

        expense.name = req.body.name;
        expense.cost = req.body.cost;
        return expense.save(function (err) {
            if (!err) {
                log.info("Expense updated");
                return res.send({ status: 'OK', expense:expense });
            } else {
                if(err.name == 'ValidationError') {
                    res.statusCode = 400;
                    res.send({ error: 'Validation error' });
                } else {
                    res.statusCode = 500;
                    res.send({ error: 'Server error' });
                }
                log.error('Internal error(%d): %s',res.statusCode,err.message);
            }
        });
    });
});

router.delete('/:id', passport.authenticate('bearer', { session: false }), (req, res) => {
    let userId = req.user.userId;

    return ExpenseModel.findById(req.params.id, (err, expense) => {
        if(!expense) {
            res.statusCode = 404;
            return res.send({ error: 'Not found' });
        }
        if (expense.userId == userId) {
            log.info(`Trying to delete expense with id = ${req.params.id}`);
            return expense.remove(function (err) {
                if (!err) {
                    log.info("Expense removed");
                    return res.send({ status: 'OK' });
                } else {
                    res.statusCode = 500;
                    log.error('Internal error(%d): %s',res.statusCode,err.message);
                    return res.send({ error: 'Server error' });
                }
            });
        } else {
            res.statusCode = 401;
            return res.send({ error: 'AccessDenied' });
        }
    });
});

module.exports = router;