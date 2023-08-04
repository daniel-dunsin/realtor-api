export interface LoginBody {
  credential: string;
  password: string;
}

export interface SingupBody {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  isAgent: boolean;
  username: string;
}
