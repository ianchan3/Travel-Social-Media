import express from 'express';

import * as postsCtrl from '../controllers/posts.js'

import auth from '../config/Auth.js';

const router = express.Router();

router.get('/', postsCtrl.index);
router.get('/search', postsCtrl.getPostsBySearch);
router.post('/', auth, postsCtrl.create);
router.patch('/:id', auth, postsCtrl.update);
router.delete('/:id', auth, postsCtrl.deletePost);
router.patch('/:id/likePost', auth, postsCtrl.likePost);


export default router;