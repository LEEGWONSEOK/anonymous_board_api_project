const Post = require('../models/post');
const sequelize = require("sequelize");
const { Op } = sequelize;
const crypto = require('crypto');

module.exports.createPost = async (req, res, next) => {
  const body = req.body;
  const inputPassword = body.password;
  const salt = Math.round((new Date().valueOf() * Math.random())) + "";
  const hashPassword = crypto.createHash('sha512').update(inputPassword + salt).digest('hex');
  await Post.create({
    title: body.title,
    content: body.content,
    password: hashPassword,
    salt
  })
    .then(result => res.send('생성이 완료되었습니다'))
    .catch(e => next(e));
}

// module.exports.createPost = async (req, res, next) => {
//   const newPost = req.body;
//   await Post.create(newPost)
//     .then(result => res.json(result))
//     .catch(e => next(e));
// }

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
  const { id } = req.params;
  const body = req.body;
  const result = await Post.findOne({
    where: { id }
  })
  const dbPassword = result.dataValues.password;
  const inputPassword = body.password;
  const salt = result.dataValues.salt;
  const hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
  if (dbPassword !== hashPassword) {
    return res.status(403).send('비밀번호가 틀렸습니다')
  }
    await Post.update({
      title: body.title,
      content: body.content,
    }, {
      where: { id }
    })
    .then(result => res.status(200).send('수정이 완료되었습니다'))
    .catch(e => next(e));
}

module.exports.deletePost = async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;
  const result = await Post.findOne({
    where: { id }
  })
  const dbPassword = result.dataValues.password;
  const inputPassword = body.password;
  const salt = result.dataValues.salt;
  const hashPassword = crypto.createHash("sha512").update(inputPassword + salt).digest("hex");
  if (dbPassword !== hashPassword) {
    return res.status(403).send('비밀번호가 틀렸습니다')
  }
  await Post.destroy({
    where: { id }
  })
    .then(result => res.status(200).send('삭제가 완료되었습니다'))
    .catch(e => next(e));
}