const express = require('express');

const router = express.Router();

const Users = require('./userDb.js');

router.post('/', (req, res) => {
  console.log('/api/users GET');
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch();
});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch();
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  Users.getById(id);
});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
