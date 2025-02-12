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
