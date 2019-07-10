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

router.get('/:id', async (req, res) => {
  try {
    const user = await Users.getById(req.params.id);
  } catch {}
});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params.id;

  Users.getById(id)
    .then(user => {
      if (user) {
        next();
      } else {
        res.status(400).json({ message: 'invalid user id' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Server broken' });
    });
}

function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
