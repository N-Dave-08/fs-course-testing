export interface User {
  id: number;
  name: string;
  email: string;
}

let users: User[] = [];

export function createUser(name: string, email: string): User {
  const user: User = {
    id: users.length + 1,
    name,
    email,
  };
  users.push(user);
  return user;
}

export function getUsersById(id: number): User | undefined {
  return users.find((u) => u.id === id);
}

export function getAllUsers(): User[] {
  return [...users];
}

export function clearUsers(): void {
  users = [];
}
