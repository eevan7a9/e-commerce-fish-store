export interface User {
  id: string | number;
  name: string;
  email: string;
  email_verified_at?: boolean;
  address?: string;
  phone?: string;
  is_admin?: boolean;
  created_at: string;
  updated_at?: string;
  profile_img?: string;
}
