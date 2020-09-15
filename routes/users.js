const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', (req, res, next) => {
  db.User.findAll().then(users => {
    var data = {
      title: 'Users/Index',
      content: users
    }
    res.render('users/index', data);
  });
});


router.get('/add', (req, res, next) => {
  var data = {
    title: 'Users/Add'
  }
  res.render('users/add', data);
});

router.post('/add', (req, res, next) => {
  db.sequelize.sync()
    .then(() => db.User.create({
      name: req.body.name,
      pass: req.body.pass,
      mail: req.body.mail,
      age: req.body.age
    }))
    .then(user => {
      res.redirect('/users');
    });

});

module.exports = router;
