const express = require('express');

const router = express.Router();

const Posts = require('./postDb.js');

router.get('/', (req, res) => {
  Posts.get()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to get posts' });
    });
});

router.get('/:id', validatePostId, (req, res) => {
  Posts.getById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to get posts' });
    });
});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

// custom middleware

function validatePostId(req, res, next) {
  const { id } = req.params;
  Posts.getById(id)
    .then(post => {
      if (post) {
        next();
      } else {
        res.status(400).json({ message: 'invalid post id' });
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Server broken' });
    });
}

module.exports = router;
