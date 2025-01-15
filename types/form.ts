export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  role: UserRole;
}

export type UserRole = 'ADMIN' | 'USER' | 'STUDENT' | 'LECTURER' | 'ORGANIZER';
