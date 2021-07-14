import { utilService } from '../services/util-service';
import { storageService } from '../services/async-storage-service.js';




const usersJson = {
    "_id": "u101",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "http://some-img.jpg",
    "mentions": [{
        "id": "m101",
        "userId": "m101",
        "taskId": "t101"
    }]
}


const USER_KEY = 'users';
const gUsers = _createUsers();

export const userService = {
    query,
    remove,
    getById,
    addUser,
    saveUser,
   
};



function _createUsers() {
    let users = utilService.loadFromStorage(USER_KEY);
    if (!users || !users.length) {
        users = usersJson;

        utilService.saveToStorage(USER_KEY, users);
    }
    return users;
}

function query() {
    return storageService.query(USER_KEY);
}

function remove(userId) {
    return storageService.remove(USER_KEY, userId)
}

function getById(userId) {
    return storageService.get(USER_KEY, userId);
}

function addUser(user) {
    return storageService.post(USER_KEY, user)

}

function saveUser(user) {
    user.isRead = true
    return storageService.put(USER_KEY, user)

}
