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
   
  static getAll(): User [] {
    return users;
  }
    
}