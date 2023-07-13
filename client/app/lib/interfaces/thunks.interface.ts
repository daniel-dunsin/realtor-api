export interface IRegister {
  username: string;
  isAgent: boolean;
  email: string;
  password: string;
}

export interface ILogin {
  credential: string;
  password: string;
}
