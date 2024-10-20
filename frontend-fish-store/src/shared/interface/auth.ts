export interface User {
  id: string | number;
  name: string;
  email: string;
  email_verified_at?: boolean;
  is_admin?: boolean;
  created_at: Date;
  updated_at?: Date;
}
