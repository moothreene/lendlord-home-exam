const Router = require('koa-router');
const { koaBody } = require('koa-body');
const router = new Router();

const ctrl = require('../controllers/users');

router.get('/user/:id', ctrl.getUserById);

router.get('/users', ctrl.getAllUsers);

router.post('/create', koaBody(), ctrl.createUser);

router.delete('/user/:id', ctrl.deleteUserById);

router.put('/user/:id', ctrl.updateUserById);

router.get('/manager/:id', ctrl.getManager);

router.allowedMethods();

module.exports = router;
