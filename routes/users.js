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
    title: 'Users/Add',
    form: new db.User(),
    err: null
  }
  res.render('users/add', data);
});

router.post('/add', (req, res, next) => {
  const form = {
    name: req.body.name,
    pass: req.body.pass,
    mail: req.body.mail,
    age: req.body.age
  }
  db.sequelize.sync()
    .then(() => db.User.create(form))
    .then(() => {
      res.redirect('/users');
    })
    .catch(err => {
      var data = {
        title: 'User/Add',
        form: form,
        err: err
      }
      res.render('users/add', data);
    })
});

router.get('/edit', (req, res, next) => {
  db.User.findByPk(req.query.id)
    .then(user => {
      var data = {
        title: 'Users/Edit',
        form: user
      }
      res.render('users/edit', data);
    });
});

router.post('/edit', (req, res, next) => {
  db.sequelize.sync()
    .then(() => db.User.update({
      name: req.body.name,
      pass: req.body.pass,
      mail: req.body.mail,
      age: req.body.req
    },
      {
        where: { id: req.body.id }
      }))
    .catch((error) => {
      console.log(error);
    })
    .then(() => {
      res.redirect('/users')
    });
});

router.get('/delete', (req, res, next) => {
  db.User.findByPk(req.query.id)
    .then(user => {
      var data = {
        title: 'Users/Delete',
        form: user
      }
      res.render('users/delete', data);
    })
});

router.post('/delete', (req, res, next) => {
  db.sequelize.sync()
    .then(() => db.User.destroy({
      where: { id: req.body.id }
    }))
    .then(() => {
      res.redirect('/users');
    })
});

module.exports = router;
