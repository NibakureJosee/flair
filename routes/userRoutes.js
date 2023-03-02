const router=require('express').Router();
const {postUser, getUser}=require('../controller/user');
const {loginUser}=require('../controller/user');
const {updatePassword}=require('../controller/user');
const{ updateUsername}=require('../controller/user');
const {logoutUser}=require('../controller/user');

router.get('/users', getUser);
router.post('/register',postUser);
router.post('/login', loginUser);
router.put('/:id/username',  updateUsername);
router.put('/:id/password', updatePassword);
router.post('/logout', logoutUser)

module.exports = router;
