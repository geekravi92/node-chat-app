/**
 * User Constructor
 */
function Users() {
    this.users = [];
}

Users.prototype.addUser = function (id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
};

Users.prototype.removeUser = function (id) {
    const user = this.getUser(id);

    if (user){
        this.users = this.users.filter(user => user.id !== id);
    }
        
    return user;
};

Users.prototype.getUser = function (id) {
    return this.users.filter(user => user.id === id)[0];
}

Users.prototype.getUserList = function (room) {
    // Array of users in a room
    const roomUsers = this.users.filter((user) => user.room === room);
    return roomUsers.map((user) => user.name);
}



module.exports = { Users };