import express from 'express';

import * as usersCtrl from '../controllers/users.js'

const router = express.Router();

router.post('/login', usersCtrl.login);
router.post('/signup', usersCtrl.signup);

export default router;