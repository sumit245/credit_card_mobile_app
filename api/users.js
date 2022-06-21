const express = require('express');
const router = express.Router();
const User = require('../models/users.model');

router.get('/users', (req, res, next) => {
  // get placeholder
  User.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/users', (req, res, next) => {
  // post placeholder
  User.create(req.body)
    .then((data) => res.json(data))
    .catch(next);
});

router.delete('/users/:id', (req, res, next) => {
  // delete placeholder
  User.findOneAndDelete({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch(next);
});

router.route('/users/:user').post(function (req, res) {
  User.findOne({ mobile_number: req.params.user }, function (err, user) {
    if (user) {
      user.messages = req.body.messages;
      console.log(user);
      user
        .save()
        .then((emp) => {
          res.json('Employee Updated Successfully');
        })
        .catch((err) => {
          res.status(400).send('Unable To Update Employee');
        });
    }
  });
});

module.exports = router;
