export interface LoginBody {
  credential: string;
  password: string;
}

export interface SingupBody {
  email: string;
  password: string;
  isAgent: boolean;
  username: string;
}
