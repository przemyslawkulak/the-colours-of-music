/* Defines the user entity */

export interface UserResponse {
  jwt: string;
  user: User;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
  created_by: null;
  updated_by: null;
}
export interface User {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
  created_by: User;
  updated_by: User;
  created_at: string;
  updated_at: string;
  password?: string;
}
