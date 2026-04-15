export interface User {
  id: string;
  username: string;
  role?: string;
  email?: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
