import express from 'express';

import * as postsCtrl from '../controllers/posts.js'

const router = express.Router();

router.get('/', postsCtrl.index);
router.post('/', postsCtrl.create);
router.patch('/:id', postsCtrl.update);
router.delete('/:id', postsCtrl.deletePost);
router.patch('/:id/likePost', postsCtrl.likePost);


export default router;