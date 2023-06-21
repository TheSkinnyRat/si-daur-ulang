export interface ISignInData {
  email: string,
  password: string,
}

export interface ISignUpData {
  idCard: string,
  email: string,
  phone: string,
  name: string,
  address: string,
  password: string,
  rePassword: string,
}

export interface IUpdateProfileData {
  idCard?: string,
  email?: string,
  phone?: string,
  name?: string,
  address?: string,
  password?: string,
  rePassword?: string,
}

export interface IAddUserData {
  idCard: string,
  email: string,
  phone: string,
  name: string,
  address: string,
  password: string,
  userRoleId: number,
}

export interface IUpdateUserData {
  idCard?: string,
  email?: string,
  phone?: string,
  name?: string,
  address?: string,
  password?: string,
  userRoleId?: number,
}
