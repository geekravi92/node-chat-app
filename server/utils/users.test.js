const expect = require('expect');

const { Users } = require('./users');

describe("Users", () => {

    const users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: "Arvind",
                room: "Node.js"
            },
            {
                id: 2,
                name: "Gopal",
                room: "Maths"
            },
            {
                id: 3,
                name: "Raj",
                room: "SSC"
            },
            {
                id: 4,
                name: "Simmi Di",
                room: "Home"
            },
            {
                id: 5,
                name: "Mummy",
                room: "Home"
            },
        ]
    });

    it("should add new user", () => {
        const users = new Users();
        const user = {
            id: 8013,
            name: "Arvind Jaiswal",
            room: "Node.js"
        };
        const resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it("should remove a user", () => {
        const userId = 1;
        const user = users.removeUser(userId);

        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(4);
    });

    it("should not remove the user", () => {
        const userId = 100;
        const user = users.removeUser(userId);

        expect(typeof user).toBe("undefined");
        expect(users.users.length).toBe(5);
    });

    it("should find a user", () => {
        const userId = 2;
        const user = users.getUser(userId);
        expect(user.id).toBe(userId);
    });

    it("should not find a user", () => {
        const userId = 100;
        const user = users.getUser(userId);
        expect(typeof user).toBe('undefined');
    });

    it("should return names of Home room", () => {
        const userList = users.getUserList("Home");

        expect(userList).toEqual(["Simmi Di", "Mummy"]);
    });
});