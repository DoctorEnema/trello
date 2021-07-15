import { utilService } from '../services/util-service';
import { storageService } from '../services/async-storage-service.js';




const usersJson = [
    {
    "_id": "u105",
    "fullname": "Abi Abambi",
    "username": "abi@ababmi.com",
    "password": "aBambi123",
    "imgUrl": "https://robohash.org/5f6a2528973d861c5d7?set=set4",
    "mentions": [{
        "id": "m101",
        "userId": "m101",
        "taskId": "t101"
    }]
},
    {
    "_id": "u106",
    "fullname": "Mosh mosh",
    "username": "Mosh@Mosh.com",
    "password": "mosh123",
    "imgUrl": "https://robohash.org/5f6a2528973d861c5d78c355?set=set4",
    "mentions": [{
        "id": "m102",
        "userId": "m102",
        "taskId": "t102"
    }]
},
]


const USER_KEY = 'user';
const gUsers = _createUsers();



export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    
}

// window.userService = userService
// Note: due to async, must run one by one...
// userService.signup({fullname: 'Puki Norma', username: 'user1', password:'123',score: 100, isAdmin: false})
// userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 100, isAdmin: true})
// userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 100})

function _createUsers() {
    let users = utilService.loadFromStorage(USER_KEY);
    if (!users || !users.length) {
        users = usersJson;

        utilService.saveToStorage(USER_KEY, users);
    }
    return users;
}

function getUsers() {
    return storageService.query('user')
    // return httpService.get(`user`)
}

function getById(userId) {
    return storageService.get('user', userId)
    // return httpService.get(`user/${userId}`)
}
function remove(userId) {
    return storageService.remove('user', userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    return storageService.put('user', user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
}


async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)
    return _saveLocalUser(user)

    // const user = await httpService.post('auth/login', userCred)
    // if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    const user = await storageService.post('user', userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.clear()
    // return await httpService.post('auth/logout')
}
function _saveLocalUser(user) {
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem('loggedinUser') || 'null')
}

