const router = require('express').Router();
const {getUsers, getUserById, createUser, updateUser, modifyUser, deleteUser} = require('../model/User');

router.get('/all', function(req, res) {
    res.send('Список всех пользователей: ' + '<br>' + JSON.stringify(getUsers()));
});

router.get('/:id', function(req, res) {
    const id = Math.floor(req.params.id);
    if (isNaN(id)) {
        res.send('Ошибка! ID пользователя должен быть натуральным числом.');
    }
    const result = getUserById(id);
    if (!result) {
        res.send(`Пользователь с ID ${id} не найден`);
    }
    res.send('Информация о пользователе с ID ' + id + '<br>' + JSON.stringify(result));
});

router.post('/', function(req, res) {
    createUser(req.body);
    res.send('Будет создан новый пользователь ' + JSON.stringify(req.body));
});

router.put('/:id', function(req, res) {
    updateUser(req.params.id, req.body);
    res.send('Изменение данных пользователя ' + req.params.id);
});

router.patch('/:id', function(req, res) {
    modifyUser(req.params.id, req.body);
    res.send('Частичное изменение данных пользователя ' + req.params.id);
});

router.delete('/:id', function(req, res) {
    deleteUser(req.params.id);
    res.send('Будет удалён пользователь с ID ' + req.params.id);
});

router.all('*', function(req, res) {
    res.send('Неверный путь или метод. Сверьтесь с API.');
});

module.exports = router;
