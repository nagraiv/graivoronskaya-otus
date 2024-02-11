let _id = 0;
const getId = () => {
    return ++_id;
}

let users = [{
    id: 0,
    name: 'Alex',
    email: 'alex1987@mail.ru'
}];


const getUsers = () => [...users];

const getUserById = (id) => {
    const [result] = users.filter(user => user.id === +id);
    return result;
};

const createUser = (user) => {
    users.push({id: getId(), ...user});
}

const updateUser = (id, user) => {
    const oldUser = getUserById(id);
    console.log(oldUser);
    if (oldUser) {
        deleteUser(id);
        users.push({id: id, ...user});
    } else {
        console.warn(`Пользователя с id ${id} не существует. Создайте пользователя с помощью POST-запроса.`);
    }
    console.log(users);
}

const modifyUser = (id, user) => {
    const oldUser = getUserById(id);
    console.log(oldUser);
    if (oldUser) {
        users.map((el, ind) => {
            if (el.id === +id) {
                users[ind] = {...oldUser, ...user};
            }
        });
    } else {
        console.warn(`Пользователя с id ${id} не существует. Создайте пользователя с помощью POST-запроса.`);
    }
    console.log(users);
}

const deleteUser = (id) => {
    users = [...users.filter(user => user.id !== +id)];
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    modifyUser,
    deleteUser
}
