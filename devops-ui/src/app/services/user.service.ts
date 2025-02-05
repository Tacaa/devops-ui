import { Injectable } from '@angular/core';
export enum Role {
  GUEST = 'GUEST',
  HOST = 'HOST',
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  role: Role;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getUserById(id: number): User {
    return this.getAll().find((user) => user.id === id)!;
  }

  getAll(): User[] {
    return [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        password: 'password123',
        role: Role.GUEST,
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        password: 'securepass',
        role: Role.HOST,
      },
    ];
  }

  getUsersByRole(role: Role): User[] {
    return this.getAll().filter((user) => user.role === role);
  }
}
