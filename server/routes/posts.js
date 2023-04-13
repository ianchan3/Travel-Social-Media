import express from 'express';

import * as postsCtrl from '../controllers/posts.js'

const router = express.Router();

router.get('/', postsCtrl.index);
router.post('/', postsCtrl.create);


export default router;