const express = require('express');
const router = express.Router();
const User = require('../models/users.model');

router.get('/users', (req, res, next) => {
  // get placeholder
  User.find({})
    .then((data) => res.json(data))
    .catch(next);
});

router.post('/users', async (req, res, next) => {
  let { mobile_number } = req.body;
  if (typeof mobile_number !== 'undefined') {
    const phone = await User.findOne({ mobile_number: mobile_number }).exec();
    if (phone) {
      return res.json({ status: 201, data: phone, msg: 'User Already Exists' });
    } else {
      const users = new User(req.body);
      users
        .save()
        .then((response) => {
          res.json({
            status: 200,
            data: response,
            msg: 'Welcome to Sbi',
          });
        })
        .catch((err) => {
          res.send(err);
        });
    }
  }
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

router.put('/users/:id', function (req, res, next) {
  let id = req.params.id;
  console.log(id);
  User.findByIdAndUpdate(id, req.body, (err, response) => {
    if (err) {
      res.json({ status: 403, msg: 'Bad Request' });
    } else {
      User.findById(id, function (error, user) {
        res.json({
          status: 201,
          data: user,
          msg: 'Account Updated Successfully',
        });
      });
    }
  });
});
//update a user

module.exports = router;
