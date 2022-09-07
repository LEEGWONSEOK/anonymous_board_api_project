const express = require('express');
const postCtrl = require('../controllers/posts');
const router = express.Router({ mergeParams: true });

/**
 * @description Post CRRUD
 * @param {String} URI 각각 자원에 대한 URI
 * @param {Object} Controller 각 API에 대응하는 Controller 
 */
router.post('/', postCtrl.createPost);      // Post Create 
router.get('/', postCtrl.readAllPost);      // Posts Read
router.get('/:id', postCtrl.readPost);      // Post Read
router.patch('/:id', postCtrl.updatePost);  // Post Update
router.delete('/:id', postCtrl.deletePost); // Post Delete

module.exports = router;