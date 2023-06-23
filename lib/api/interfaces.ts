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

export interface IAdminAddUserData {
  idCard: string,
  email: string,
  phone: string,
  name: string,
  address: string,
  password: string,
  userRoleId: number,
}

export interface IAdminUpdateUserData {
  idCard?: string,
  email?: string,
  phone?: string,
  name?: string,
  address?: string,
  password?: string,
  userRoleId?: number,
}

export interface IUserAddRecycleData {
  type: string,
  weight: number,
  selfDelivery: number,
}

export interface IDriverUpdateRecycleData {
  recycleStatusId: number,
}
