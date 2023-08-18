let users = [
    { id: 1, username: 'khoa123', displayName: 'Đăng Khoa', age: 20 },
    { id: 2, username: 'giang123', displayName: 'Hà Giang', age: 19 },
]

export function getUsers() {
    return users
}

export function addUser(user) {
    users.push({
        id: users.length+1,
        displayName: user.displayName,
        age: user.age,
    })
}

export function findUserById(userId) {
    return users.find(user => user.id === userId)
}

export function deleteUserById(userId) {
    const beforeLength = users.length
    users = users.filter(user => user.id !== userId)

    if (users.length === beforeLength) {
        return false
    }
    return true
}

export function updateUserById(userId, user) {
    const userIndex = users.findIndex(eachUser => eachUser.id === userId)
    if (userIndex < 0) return false

    users[userIndex].username = user.username
    users[userIndex].displayName = user.displayName
    users[userIndex].age = user.age

    return true
}
