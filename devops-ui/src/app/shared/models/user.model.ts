import { Address } from './address.model';

export enum Role {
  HOST = 'HOST',
  GUEST = 'GUEST',
}

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  email: string;
  role: Role;
  deleted: boolean;
  address?: Address; // Optional since it might not always be loaded/present
}

export interface CurrentUser {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  role: Role;
  enabled: boolean;
}

export interface UserRegisterRequest {
  username: string;
  password: string;
  firstname: string;
  lastname: string;
  email: string;
  role: Role;
  address?: Address;
}
