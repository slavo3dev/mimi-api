interface User {
    id: number;
    name: string;
    email: string;
}

let users: User[] = [
  { id: 1, name: "Marko", email: "marko@example.com" },
  { id: 2, name: "Ana", email: "ana@example.com" }
];

export class UserModel {
    static getAll(): User[] {
        return users;
    }

    static getById (id: number): User | undefined {
        return users.find ((user) => user.id === id)
    }

    static create(user: User): User {
        users.push(user)
        return user
    }

}