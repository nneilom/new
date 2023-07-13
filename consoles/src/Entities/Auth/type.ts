export interface IRegister {
  last_name: string;
  first_name: string;
  email: string;
  password: string;
  password_confirm: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IAuth {
  refresh: string;
}

export interface IResetPassword {
  email: string;
}

export interface IAfterResetMakeNewPassword {
  code: string;
  password: string;
  password_confirm: string;
}

export interface IChangePassword {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
}

export interface IToken {
  refresh: string;
  access: string;
}
