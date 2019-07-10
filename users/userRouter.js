const express = require('express');

const router = express.Router();

const Users = require('./userDb.js');
const Posts = require('../posts/postDb.js');

router.post('/', validateUser, (req, res) => {
  console.log('/api/users POST');
  Users.insert(req.body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500);
    });
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const newPost = { user_id: req.user.id, ...req.body };
  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to add post' });
    });
});

router.get('/', (req, res) => {
  Users.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch();
});

router.get('/:id', validateUserId, async (req, res) => {
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to add post' });
    });
});

router.get('/:id/posts', validateUserId, (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to add post' });
    });
});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'invalid user id' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Server broken' });
    });
}

function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!req.body.name) {
    res.status(400).json({ message: 'missing required name field' });
  } else next();
}

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' });
  } else next();
}

module.exports = router;
