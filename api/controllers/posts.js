const Post = require('../models/post');
const sequelize = require("sequelize");
const { Op } = sequelize;
const crypto = require('crypto');

// module.exports.createPost = async (req, res, next) => {
//   const newPost = req.body;
//   const inputPassword = newPost.password;
//   const salt = Math.round((new Date().valueOf() * Math.random())) + "";
//   const hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
//   await Post.create({
//     title: newPost.title,
//     content: newPost.content,
//     password: hashPassword,
//   })
//     .then(result => res.json(result))
//     .catch(e => next(e));
// }

module.exports.createPost = async (req, res, next) => {
  const newPost = req.body;
  await Post.create(newPost)
    .then(result => res.json(result))
    .catch(e => next(e));
}

module.exports.readAllPost = async (req, res, next) => {
  await Post.findAll({
    order: [['createAt', 'DESC']],
  })
    .then(result => res.json(result))
    .catch(e => next(e));
}

module.exports.readPost = async (req, res, next) => {
  const { id } = req.params;
  await Post.findOne({
    where: { id },
  })
    .then(result => res.json(result))
    .catch(e => next(e));
}

module.exports.updatePost = async (req, res, next) => {
  const newPost = req.body;
  await Post.create(newPost)
    .then(result => res.json(result))
    .catch(e => next(e));
}

module.exports.deletePost = async (req, res, next) => {
  const newPost = req.body;
  await Post.create(newPost)
    .then(result => res.json(result))
    .catch(e => next(e));
}