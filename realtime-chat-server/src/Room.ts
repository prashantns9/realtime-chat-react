import User from "./User";

export default class Room {
    name: string = '';
    users: Array<User> = [];

    constructor(roomName: string) {
        this.name = roomName;

    }

    addUser(id: string, name: string) {
        name = name.trim().toLowerCase();
        if (this.users.find(u => u.id === id || u.name === name)) {
            return false;
        } else {
            this.users.push({id, name});
            return true;
        }
    }

    removeUser(id: string): string {
        const index = this.users.findIndex(u => u.id === id);
        if (index > -1) {
            let name = this.users[index].name;
            this.users.splice(index, 1);
            return name;
        } else {
            return '';
        }
    }
}
