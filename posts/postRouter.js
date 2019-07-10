const express = require('express');

const router = express.Router();

const Posts = require('./postDb.js');
const userRouter = require('../users/userRouter.js');

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

router.delete('/:id', validatePostId, (req, res) => {
  Posts.remove(req.params.id)
    .then(post => {
      res.status(204).end();
    })
    .catch(err => {
      res.status(500).json({ error: 'Unable to delete post' });
    });
});

router.put('/:id', validatePostId, validatePost, async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    res.status(200).json(await Posts.getById(req.params.id));
  } catch (error) {
    res.status(500).json({ error: 'Unable to update post' });
  }
});

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

function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ message: 'missing post data' });
  } else if (!req.body.text) {
    res.status(400).json({ message: 'missing required text field' });
  } else next();
}

module.exports = router;
